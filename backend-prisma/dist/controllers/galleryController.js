"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGalleryItem = exports.updateGalleryItem = exports.createGalleryItem = exports.getGalleryItemById = exports.getAllGalleryItems = void 0;
const server_1 = require("../server");
const getAllGalleryItems = async (req, res) => {
    try {
        const { page = 1, limit = 12 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const [galleryItems, total] = await Promise.all([
            server_1.prisma.gallery.findMany({
                skip,
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
            }),
            server_1.prisma.gallery.count(),
        ]);
        const totalPages = Math.ceil(total / Number(limit));
        const response = {
            success: true,
            data: galleryItems,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                totalPages,
            },
        };
        res.json(response);
    }
    catch (error) {
        console.error('Error fetching gallery items:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch gallery items',
        });
    }
};
exports.getAllGalleryItems = getAllGalleryItems;
const getGalleryItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const galleryItem = await server_1.prisma.gallery.findUnique({
            where: { id },
        });
        if (!galleryItem) {
            res.status(404).json({
                success: false,
                error: 'Gallery item not found',
            });
            return;
        }
        const response = {
            success: true,
            data: galleryItem,
        };
        res.json(response);
    }
    catch (error) {
        console.error('Error fetching gallery item:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch gallery item',
        });
    }
};
exports.getGalleryItemById = getGalleryItemById;
const createGalleryItem = async (req, res) => {
    try {
        const { imageUrl, caption } = req.body;
        const galleryItem = await server_1.prisma.gallery.create({
            data: {
                imageUrl,
                caption,
            },
        });
        const response = {
            success: true,
            data: galleryItem,
            message: 'Gallery item created successfully',
        };
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Error creating gallery item:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create gallery item',
        });
    }
};
exports.createGalleryItem = createGalleryItem;
const updateGalleryItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { imageUrl, caption } = req.body;
        const galleryItem = await server_1.prisma.gallery.update({
            where: { id },
            data: {
                imageUrl,
                caption,
            },
        });
        const response = {
            success: true,
            data: galleryItem,
            message: 'Gallery item updated successfully',
        };
        res.json(response);
    }
    catch (error) {
        console.error('Error updating gallery item:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update gallery item',
        });
    }
};
exports.updateGalleryItem = updateGalleryItem;
const deleteGalleryItem = async (req, res) => {
    try {
        const { id } = req.params;
        await server_1.prisma.gallery.delete({
            where: { id },
        });
        const response = {
            success: true,
            message: 'Gallery item deleted successfully',
        };
        res.json(response);
    }
    catch (error) {
        console.error('Error deleting gallery item:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete gallery item',
        });
    }
};
exports.deleteGalleryItem = deleteGalleryItem;
//# sourceMappingURL=galleryController.js.map