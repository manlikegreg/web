import express from 'express';
import { getAllGalleryItems, getGalleryItemById, createGalleryItem, updateGalleryItem, deleteGalleryItem, } from '../controllers/galleryController.js';
import { validateGallery, handleValidationErrors } from '../middleware/validation.js';
const router = express.Router();
router.get('/', getAllGalleryItems);
router.get('/:id', getGalleryItemById);
router.post('/', validateGallery, handleValidationErrors, createGalleryItem);
router.put('/:id', validateGallery, handleValidationErrors, updateGalleryItem);
router.delete('/:id', deleteGalleryItem);
export default router;
//# sourceMappingURL=gallery.js.map