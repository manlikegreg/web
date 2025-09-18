import express from 'express';
import { prisma } from '../server.js';

const router = express.Router();

// Upsert site-wide settings stored as key-value rows
router.get('/', async (_req, res) => {
  const rows = await prisma.setting.findMany();
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value;
  res.json({ success: true, data: map });
});

router.put('/', express.json(), async (req, res) => {
  const data = req.body as Record<string, string>;
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

export default router;

