import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { getPrisma, disconnectPrisma } from './lib/prisma.js';
import path from 'path';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import studentRoutes from './routes/students.js';
import articleRoutes from './routes/articles.js';
import galleryRoutes from './routes/gallery.js';
import leadershipRoutes from './routes/leadership.js';
import uploadRoutes from './routes/upload.js';
import settingsRoutes from './routes/settings.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
export const prisma = getPrisma();
app.use(helmet());
const allowedOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
app.use(cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: true,
}));
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
else {
    app.use(morgan('combined'));
}
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Science 1B API is running',
        timestamp: new Date().toISOString(),
    });
});
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Science 1B API is running',
        timestamp: new Date().toISOString(),
    });
});
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Science 1B Backend (Prisma) - see /api and /health',
        links: {
            health: '/health',
            api_health: '/api/health',
            students: '/api/students',
            articles: '/api/articles',
            gallery: '/api/gallery',
            settings: '/api/settings',
        },
    });
});
app.use('/api/students', studentRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/leadership', leadershipRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);
app.use(notFound);
app.use(errorHandler);
process.on('SIGINT', async () => {
    await disconnectPrisma();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    await disconnectPrisma();
    process.exit(0);
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});
export default app;
//# sourceMappingURL=server.js.map