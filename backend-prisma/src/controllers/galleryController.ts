import { Request, Response } from 'express';
import { prisma } from '../server.js';
import { ApiResponse, Gallery } from '../types/index.js';

// GET /api/gallery - Get all gallery items
export const getAllGalleryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [galleryItems, total] = await Promise.all([
      prisma.gallery.findMany({
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.gallery.count(),
    ]);

    const totalPages = Math.ceil(total / Number(limit));

    const response: ApiResponse<Gallery[]> = {
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
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch gallery items',
    });
  }
};

// GET /api/gallery/:id - Get gallery item by ID
export const getGalleryItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const galleryItem = await prisma.gallery.findUnique({
      where: { id },
    });

    if (!galleryItem) {
      res.status(404).json({
        success: false,
        error: 'Gallery item not found',
      });
      return;
    }

    const response: ApiResponse<Gallery> = {
      success: true,
      data: galleryItem,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching gallery item:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch gallery item',
    });
  }
};

// POST /api/gallery - Create new gallery item
export const createGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { imageUrl, caption, order, category, type } = req.body;

    const galleryItem = await prisma.gallery.create({
      data: {
        imageUrl,
        caption: caption || null,
        order: typeof order === 'number' ? order : 0,
        category: category || null,
        type: type || null,
      },
    });

    const response: ApiResponse<Gallery> = {
      success: true,
      data: galleryItem,
      message: 'Gallery item created successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create gallery item',
    });
  }
};

// PUT /api/gallery/:id - Update gallery item
export const updateGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { imageUrl, caption, order, category, type } = req.body;

    const galleryItem = await prisma.gallery.update({
      where: { id },
      data: {
        imageUrl,
        caption: caption ?? undefined,
        order: typeof order === 'number' ? order : undefined,
        category: category ?? undefined,
        type: type ?? undefined,
      },
    });

    const response: ApiResponse<Gallery> = {
      success: true,
      data: galleryItem,
      message: 'Gallery item updated successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update gallery item',
    });
  }
};

// DELETE /api/gallery/:id - Delete gallery item
export const deleteGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.gallery.delete({
      where: { id },
    });

    const response: ApiResponse<null> = {
      success: true,
      message: 'Gallery item deleted successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete gallery item',
    });
  }
};
