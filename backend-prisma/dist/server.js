import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { getPrisma, disconnectPrisma } from './lib/prisma.js';
import session from 'express-session';
import AdminJSExpress from '@adminjs/express';
import { buildAdmin } from './admin.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import studentRoutes from './routes/students.js';
import articleRoutes from './routes/articles.js';
import galleryRoutes from './routes/gallery.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
export const prisma = getPrisma();
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
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
app.use('/api/students', studentRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/gallery', galleryRoutes);
if (process.env.ADMINJS_ENABLED === 'true') {
    const admin = buildAdmin(prisma);
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@science1b.local';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
    const SESSION_SECRET = process.env.SESSION_SECRET || 'science1b-secret';
    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    }));
    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
        authenticate: async (email, password) => {
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                return { email };
            }
            return null;
        },
        cookieName: 'science1b_admin',
        cookiePassword: SESSION_SECRET,
    }, null, {
        resave: false,
        saveUninitialized: false,
        secret: SESSION_SECRET,
    });
    app.use(admin.options.rootPath, adminRouter);
}
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