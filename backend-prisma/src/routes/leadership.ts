import express from 'express';
import { prisma } from '../server.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Validation middleware
const validateLeadership = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('position').trim().notEmpty().withMessage('Position is required').isLength({ min: 2, max: 100 }).withMessage('Position must be between 2 and 100 characters'),
  body('profilePic')
    .optional()
    .custom((value) => {
      if (!value || String(value).trim() === '') return true;
      const v = String(value).trim();
      if (v.startsWith('/uploads/')) return true;
      try { new URL(v); return true; } catch { return false; }
    })
    .withMessage('Profile picture must be a valid URL or /uploads path'),
  body('bio').optional().isString(),
  body('order').optional().isInt().withMessage('Order must be a number'),
];

// Get all leadership members
router.get('/', async (req, res) => {
  try {
    const members = await prisma.leadership.findMany({
      orderBy: { order: 'asc' }
    });
    res.json({ success: true, data: members });
  } catch (error) {
    console.error('Error fetching leadership members:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch leadership members' });
  }
});

// Get single leadership member
router.get('/:id', async (req, res) => {
  try {
    const member = await prisma.leadership.findUnique({
      where: { id: req.params.id }
    });
    
    if (!member) {
      return res.status(404).json({ success: false, error: 'Leadership member not found' });
    }
    
    return res.json({ success: true, data: member });
  } catch (error) {
    console.error('Error fetching leadership member:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch leadership member' });
  }
});

// Create new leadership member
router.post('/', validateLeadership, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { name, position, profilePic, bio, order } = req.body;
    
    const member = await prisma.leadership.create({
      data: {
        name,
        position,
        profilePic: profilePic || null,
        bio: bio || null,
        order: typeof order === 'number' ? order : 0,
      }
    });
    
    return res.status(201).json({ success: true, data: member });
  } catch (error) {
    console.error('Error creating leadership member:', error);
    return res.status(500).json({ success: false, error: 'Failed to create leadership member' });
  }
});

// Update leadership member
router.put('/:id', validateLeadership, async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { name, position, profilePic, bio, order } = req.body;
    
    const member = await prisma.leadership.update({
      where: { id: req.params.id },
      data: {
        name,
        position,
        profilePic: profilePic ?? undefined,
        bio: bio ?? undefined,
        order: typeof order === 'number' ? order : undefined,
      }
    });
    
    return res.json({ success: true, data: member });
  } catch (error) {
    console.error('Error updating leadership member:', error);
    return res.status(500).json({ success: false, error: 'Failed to update leadership member' });
  }
});

// Delete leadership member
router.delete('/:id', async (req, res) => {
  try {
    await prisma.leadership.delete({
      where: { id: req.params.id }
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting leadership member:', error);
    res.status(500).json({ success: false, error: 'Failed to delete leadership member' });
  }
});

// Reorder leadership members
router.put('/reorder', express.json(), async (req, res) => {
  try {
    const { members } = req.body;
    
    if (!Array.isArray(members)) {
      return res.status(400).json({ success: false, error: 'Members must be an array' });
    }

    // Update order for each member
    for (let i = 0; i < members.length; i++) {
      await prisma.leadership.update({
        where: { id: members[i].id },
        data: { order: i }
      });
    }
    
    return res.json({ success: true });
  } catch (error) {
    console.error('Error reordering leadership members:', error);
    return res.status(500).json({ success: false, error: 'Failed to reorder leadership members' });
  }
});

export default router;