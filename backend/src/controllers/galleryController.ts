import { Request, Response } from 'express';
import { query } from '../utils/database';
import { GalleryItem, ApiResponse } from '../types';

// Get all gallery items with pagination
export const getAllGalleryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 12,
      sortBy = 'created_at',
      sortOrder = 'desc',
      category,
      type,
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    let whereClause = 'WHERE 1=1';
    const queryParams: any[] = [];
    let paramCount = 0;

    if (category) {
      paramCount++;
      whereClause += ` AND category = $${paramCount}`;
      queryParams.push(category);
    }

    if (type) {
      paramCount++;
      whereClause += ` AND type = $${paramCount}`;
      queryParams.push(type);
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM gallery_items ${whereClause}`;
    const countResult = await query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].count);

    // Get gallery items
    const galleryQuery = `
      SELECT * FROM gallery_items 
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `;
    
    const queryParamsWithLimit = [...queryParams, Number(limit), offset];
    const result = await query(galleryQuery, queryParamsWithLimit);

    const totalPages = Math.ceil(total / Number(limit));

    const response: ApiResponse<GalleryItem[]> = {
      success: true,
      data: result.rows,
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

// Get gallery item by ID
export const getGalleryItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM gallery_items WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Gallery item not found',
      });
      return;
    }

    const response: ApiResponse<GalleryItem> = {
      success: true,
      data: result.rows[0],
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

// Get gallery items by category
export const getGalleryItemsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    // Get total count for category
    const countResult = await query(
      'SELECT COUNT(*) FROM gallery_items WHERE category = $1',
      [category]
    );
    const total = parseInt(countResult.rows[0].count);

    // Get gallery items for category
    const result = await query(
      `SELECT * FROM gallery_items 
       WHERE category = $1 
       ORDER BY created_at DESC 
       LIMIT $2 OFFSET $3`,
      [category, Number(limit), offset]
    );

    const totalPages = Math.ceil(total / Number(limit));

    const response: ApiResponse<GalleryItem[]> = {
      success: true,
      data: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages,
      },
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching gallery items by category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch gallery items',
    });
  }
};

// Create new gallery item
export const createGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      image_url,
      type,
      video_url,
      category,
    } = req.body;

    const result = await query(
      `INSERT INTO gallery_items (title, description, image_url, type, video_url, category)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, image_url, type, video_url, category]
    );

    const response: ApiResponse<GalleryItem> = {
      success: true,
      data: result.rows[0],
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

// Update gallery item
export const updateGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      image_url,
      type,
      video_url,
      category,
    } = req.body;

    const result = await query(
      `UPDATE gallery_items 
       SET title = $1, description = $2, image_url = $3, type = $4, 
           video_url = $5, category = $6
       WHERE id = $7
       RETURNING *`,
      [title, description, image_url, type, video_url, category, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Gallery item not found',
      });
      return;
    }

    const response: ApiResponse<GalleryItem> = {
      success: true,
      data: result.rows[0],
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

// Delete gallery item
export const deleteGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM gallery_items WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Gallery item not found',
      });
      return;
    }

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
