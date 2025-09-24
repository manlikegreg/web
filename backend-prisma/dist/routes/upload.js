import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
const router = express.Router();
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir))
    fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const ts = Date.now();
        const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
        cb(null, `${ts}-${safe}`);
    },
});
const upload = multer({ storage });
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ success: false, error: 'No file uploaded' });
        return;
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ success: true, data: { url } });
});
export default router;
//# sourceMappingURL=upload.js.map