import express from 'express';
import { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle, } from '../controllers/articleController.js';
import { validateArticle, handleValidationErrors } from '../middleware/validation.js';
const router = express.Router();
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/', validateArticle, handleValidationErrors, createArticle);
router.put('/:id', validateArticle, handleValidationErrors, updateArticle);
router.delete('/:id', deleteArticle);
export default router;
//# sourceMappingURL=articles.js.map