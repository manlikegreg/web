import express from 'express';
import {
  getAllGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import { validateGallery, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// GET /api/gallery - Get all gallery items
router.get('/', getAllGalleryItems);

// GET /api/gallery/:id - Get gallery item by ID
router.get('/:id', getGalleryItemById);

// POST /api/gallery - Create new gallery item
router.post('/', validateGallery, handleValidationErrors, createGalleryItem);

// PUT /api/gallery/:id - Update gallery item
router.put('/:id', validateGallery, handleValidationErrors, updateGalleryItem);

// DELETE /api/gallery/:id - Delete gallery item
router.delete('/:id', deleteGalleryItem);

export default router;
