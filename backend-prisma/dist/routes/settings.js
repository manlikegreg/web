import express from 'express';
import { prisma } from '../server.js';
const router = express.Router();
router.get('/', async (_req, res) => {
    const rows = await prisma.setting.findMany();
    const map = {};
    for (const r of rows)
        map[r.key] = r.value;
    res.json({ success: true, data: map });
});
router.put('/', express.json(), async (req, res) => {
    const data = req.body;
    if (!data || typeof data !== 'object') {
        res.status(400).json({ success: false, error: 'Invalid payload' });
        return;
    }
    const entries = Object.entries(data);
    for (const [key, value] of entries) {
        await prisma.setting.upsert({
            where: { key },
            update: { value: String(value ?? '') },
            create: { key, value: String(value ?? '') },
        });
    }
    res.json({ success: true });
});
router.get('/home', async (_req, res) => {
    const keys = ['home.title', 'home.subtitle', 'home.cta', 'home.heroImage'];
    const rows = await prisma.setting.findMany({ where: { key: { in: keys } } });
    const map = {};
    rows.forEach((r) => map[r.key] = r.value);
    res.json({ success: true, data: map });
});
router.put('/home', express.json(), async (req, res) => {
    const payload = req.body;
    for (const k of Object.keys(payload || {})) {
        await prisma.setting.upsert({ where: { key: k }, update: { value: String(payload[k] ?? '') }, create: { key: k, value: String(payload[k] ?? '') } });
    }
    res.json({ success: true });
});
router.get('/about', async (_req, res) => {
    const keys = ['about.history', 'about.achievements', 'about.motto', 'about.image'];
    const rows = await prisma.setting.findMany({ where: { key: { in: keys } } });
    const map = {};
    rows.forEach((r) => map[r.key] = r.value);
    res.json({ success: true, data: map });
});
router.put('/about', express.json(), async (req, res) => {
    const payload = req.body;
    for (const k of Object.keys(payload || {})) {
        await prisma.setting.upsert({ where: { key: k }, update: { value: String(payload[k] ?? '') }, create: { key: k, value: String(payload[k] ?? '') } });
    }
    res.json({ success: true });
});
router.get('/contact', async (_req, res) => {
    const keys = ['contact.description', 'contact.email', 'contact.phone', 'contact.socials'];
    const rows = await prisma.setting.findMany({ where: { key: { in: keys } } });
    const map = {};
    rows.forEach((r) => map[r.key] = r.value);
    res.json({ success: true, data: map });
});
router.put('/contact', express.json(), async (req, res) => {
    const payload = req.body;
    for (const k of Object.keys(payload || {})) {
        await prisma.setting.upsert({ where: { key: k }, update: { value: String(payload[k] ?? '') }, create: { key: k, value: String(payload[k] ?? '') } });
    }
    res.json({ success: true });
});
router.get('/leadership', async (_req, res) => {
    const keys = ['leadership.title', 'leadership.description', 'leadership.image', 'leadership.team'];
    const rows = await prisma.setting.findMany({ where: { key: { in: keys } } });
    const map = {};
    rows.forEach((r) => map[r.key] = r.value);
    res.json({ success: true, data: map });
});
router.put('/leadership', express.json(), async (req, res) => {
    const payload = req.body;
    for (const k of Object.keys(payload || {})) {
        await prisma.setting.upsert({ where: { key: k }, update: { value: String(payload[k] ?? '') }, create: { key: k, value: String(payload[k] ?? '') } });
    }
    res.json({ success: true });
});
export default router;
//# sourceMappingURL=settings.js.map