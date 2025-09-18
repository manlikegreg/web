import express from 'express';
import {
  getAllGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import { validateGallery, handleValidationErrors } from '../middleware/validation.js';
import { prisma } from '../server.js';

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

// PUT /api/gallery/reorder - Reorder gallery items
router.put('/reorder', express.json(), async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, error: 'Items must be an array' });
    }

    // Update the order of items
    for (let i = 0; i < items.length; i++) {
      await prisma.gallery.update({
        where: { id: items[i].id },
        data: { order: i }
      });
    }

    res.json({ success: true, message: 'Gallery items reordered successfully' });
  } catch (error) {
    console.error('Error reordering gallery items:', error);
    res.status(500).json({ success: false, error: 'Failed to reorder gallery items' });
  }
});

export default router;
