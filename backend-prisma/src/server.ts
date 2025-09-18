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
import articleRoutes from './routes/articles.js';
import galleryRoutes from './routes/gallery.js';
// Uploads and settings routes
import uploadRoutes from './routes/upload.js';
import settingsRoutes from './routes/settings.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Prisma Client lazily
export const prisma: PrismaClient = getPrisma();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

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
      articles: '/api/articles',
      gallery: '/api/gallery',
      admin: process.env.ADMINJS_ENABLED === 'true' ? '/admin' : undefined,
    },
  });
});

// API routes
app.use('/api/students', studentRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);

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
