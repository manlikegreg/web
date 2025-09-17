import express from 'express';
import {
  getAllAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getAchievementsByCategory,
} from '../controllers/achievementController';

const router = express.Router();

// GET /api/achievements - Get all achievements
router.get('/', getAllAchievements);

// GET /api/achievements/category/:category - Get achievements by category
router.get('/category/:category', getAchievementsByCategory);

// GET /api/achievements/:id - Get achievement by ID
router.get('/:id', getAchievementById);

// POST /api/achievements - Create new achievement
router.post('/', createAchievement);

// PUT /api/achievements/:id - Update achievement
router.put('/:id', updateAchievement);

// DELETE /api/achievements/:id - Delete achievement
router.delete('/:id', deleteAchievement);

export default router;
