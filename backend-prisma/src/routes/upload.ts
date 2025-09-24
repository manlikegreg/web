import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ts = Date.now();
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${ts}-${safe}`);
  },
});

const allowedMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'video/mp4',
  'video/webm',
  'video/ogg',
]);

const maxFileSize = Number(process.env.MAX_FILE_SIZE || 10 * 1024 * 1024); // default 10MB

const upload = multer({
  storage,
  limits: { fileSize: maxFileSize },
  fileFilter: (_req, file, cb) => {
    if (allowedMimeTypes.has(file.mimetype)) return cb(null, true);
    cb(new Error('Unsupported file type'));
  },
});

router.post('/', (req, res, next) => {
  upload.single('file')(req, res, (err: any) => {
    if (err) {
      const message = err.message || 'Upload failed';
      res.status(400).json({ success: false, error: message });
      return;
    }
    next();
  });
}, (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, error: 'No file uploaded' });
    return;
  }
  const relative = `/uploads/${req.file.filename}`;
  const base = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;
  const absolute = `${base}${relative}`;
  res.json({ success: true, data: { url: relative, absoluteUrl: absolute } });
});

export default router;

