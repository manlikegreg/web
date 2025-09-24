import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { getPrisma, disconnectPrisma } from './lib/prisma.js';
import path from 'path';
import session from 'express-session';

import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

// Import routes
import studentRoutes from './routes/students.js';
import teacherRoutes from './routes/teachers.js';
import articleRoutes from './routes/articles.js';
import galleryRoutes from './routes/gallery.js';
import leadershipRoutes from './routes/leadership.js';
// Uploads and settings routes
import uploadRoutes from './routes/upload.js';
import settingsRoutes from './routes/settings.js';
import resetRoutes from './routes/reset.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Prisma Client lazily
export const prisma: PrismaClient = getPrisma();

// Security middleware
app.use(helmet());

// CORS configuration (allow configured list or reflect request origin)
const corsEnv = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || process.env.CORS_ORIGIN || '';
const allowedOrigins = corsEnv
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests or same-origin
    if (!origin) return callback(null, true);

    // If no whitelist configured, allow all
    if (allowedOrigins.length === 0) return callback(null, true);

    // Exact match against configured list
    if (allowedOrigins.includes(origin)) return callback(null, true);

    try {
      const { hostname } = new URL(origin);
      // Allow any Netlify preview domain by default
      if (hostname.endsWith('.netlify.app')) return callback(null, true);
    } catch {
      // fallthrough
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Rate limiting - More generous for public API
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Increased from 100 to 500 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip successful requests (2xx status codes)
  skipSuccessfulRequests: true,
  // Skip failed requests (4xx status codes except 429)
  skipFailedRequests: false,
});

// Stricter rate limiting for admin operations
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // More restrictive for admin operations
  message: {
    success: false,
    error: 'Too many admin requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  skipFailedRequests: false,
});

// Apply general rate limiting to all routes
app.use(generalLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Static files for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Science 1B API is running',
    timestamp: new Date().toISOString(),
  });
});

// API health alias for frontend compatibility
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Science 1B API is running',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint - helpful landing message instead of 404
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Science 1B Backend (Prisma) - see /api and /health',
    links: {
      health: '/health',
      api_health: '/api/health',
      students: '/api/students',
      teachers: '/api/teachers',
      articles: '/api/articles',
      gallery: '/api/gallery',
      settings: '/api/settings',
    },
  });
});

// API routes
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/leadership', leadershipRoutes);

// Admin routes with stricter rate limiting
app.use('/api/upload', adminLimiter, uploadRoutes);
app.use('/api/settings', adminLimiter, settingsRoutes);
app.use('/api/reset', adminLimiter, resetRoutes);

// Note: Backend admin UIs removed.

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
  await disconnectPrisma();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectPrisma();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});

export default app;
