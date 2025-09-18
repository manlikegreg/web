"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const express_session_1 = __importDefault(require("express-session"));
const express_2 = __importDefault(require("@adminjs/express"));
const admin_1 = require("./admin");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const students_1 = __importDefault(require("./routes/students"));
const articles_1 = __importDefault(require("./routes/articles"));
const gallery_1 = __importDefault(require("./routes/gallery"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
exports.prisma = new client_1.PrismaClient();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, compression_1.default)());
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
else {
    app.use((0, morgan_1.default)('combined'));
}
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Science 1B API is running',
        timestamp: new Date().toISOString(),
    });
});
app.use('/api/students', students_1.default);
app.use('/api/articles', articles_1.default);
app.use('/api/gallery', gallery_1.default);
const admin = (0, admin_1.buildAdmin)(exports.prisma);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@science1b.local';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_SECRET = process.env.SESSION_SECRET || 'science1b-secret';
app.use((0, express_session_1.default)({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
}));
const adminRouter = express_2.default.buildAuthenticatedRouter(admin, {
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
app.use(notFound_1.default);
app.use(errorHandler_1.default);
process.on('SIGINT', async () => {
    await exports.prisma.$disconnect();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    await exports.prisma.$disconnect();
    process.exit(0);
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});
exports.default = app;
//# sourceMappingURL=server.js.map