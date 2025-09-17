import express from 'express';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByCategory,
} from '../controllers/articleController';

const router = express.Router();

// GET /api/articles - Get all articles with pagination
router.get('/', getAllArticles);

// GET /api/articles/category/:category - Get articles by category
router.get('/category/:category', getArticlesByCategory);

// GET /api/articles/:id - Get article by ID
router.get('/:id', getArticleById);

// POST /api/articles - Create new article
router.post('/', createArticle);

// PUT /api/articles/:id - Update article
router.put('/:id', updateArticle);

// DELETE /api/articles/:id - Delete article
router.delete('/:id', deleteArticle);

export default router;
