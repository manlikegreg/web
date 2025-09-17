import express from 'express';
import {
  getAllGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getGalleryItemsByCategory,
} from '../controllers/galleryController';

const router = express.Router();

// GET /api/gallery - Get all gallery items with pagination
router.get('/', getAllGalleryItems);

// GET /api/gallery/category/:category - Get gallery items by category
router.get('/category/:category', getGalleryItemsByCategory);

// GET /api/gallery/:id - Get gallery item by ID
router.get('/:id', getGalleryItemById);

// POST /api/gallery - Create new gallery item
router.post('/', createGalleryItem);

// PUT /api/gallery/:id - Update gallery item
router.put('/:id', updateGalleryItem);

// DELETE /api/gallery/:id - Delete gallery item
router.delete('/:id', deleteGalleryItem);

export default router;
