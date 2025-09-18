import express from 'express';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articleController.js';
import { validateArticle, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// GET /api/articles - Get all articles
router.get('/', getAllArticles);

// GET /api/articles/:id - Get article by ID
router.get('/:id', getArticleById);

// POST /api/articles - Create new article
router.post('/', validateArticle, handleValidationErrors, createArticle);

// PUT /api/articles/:id - Update article
router.put('/:id', validateArticle, handleValidationErrors, updateArticle);

// DELETE /api/articles/:id - Delete article
router.delete('/:id', deleteArticle);

export default router;
