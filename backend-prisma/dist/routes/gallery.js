import express from 'express';
import { getAllGalleryItems, getGalleryItemById, createGalleryItem, updateGalleryItem, deleteGalleryItem, } from '../controllers/galleryController.js';
import { validateGallery, handleValidationErrors } from '../middleware/validation.js';
import { prisma } from '../server.js';
const router = express.Router();
router.get('/', getAllGalleryItems);
router.get('/:id', getGalleryItemById);
router.post('/', validateGallery, handleValidationErrors, createGalleryItem);
router.put('/:id', validateGallery, handleValidationErrors, updateGalleryItem);
router.delete('/:id', deleteGalleryItem);
router.put('/reorder', express.json(), async (req, res) => {
    try {
        const { items } = req.body;
        if (!Array.isArray(items)) {
            res.status(400).json({ success: false, error: 'Items must be an array' });
            return;
        }
        for (let i = 0; i < items.length; i++) {
            await prisma.gallery.update({
                where: { id: items[i].id },
                data: { order: i }
            });
        }
        res.json({ success: true, message: 'Gallery items reordered successfully' });
    }
    catch (error) {
        console.error('Error reordering gallery items:', error);
        res.status(500).json({ success: false, error: 'Failed to reorder gallery items' });
    }
});
export default router;
//# sourceMappingURL=gallery.js.map