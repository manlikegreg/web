import { Request, Response } from 'express';
import { query } from '../utils/database';
import { Achievement, ApiResponse } from '../types';

// Get all achievements
export const getAllAchievements = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'year',
      sortOrder = 'desc',
      category,
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    let whereClause = '';
    const queryParams: any[] = [];

    if (category) {
      whereClause = 'WHERE category = $3';
      queryParams.push(category);
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM achievements ${whereClause}`;
    const countResult = await query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].count);

    // Get achievements
    const achievementsQuery = `
      SELECT * FROM achievements 
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT $1 OFFSET $2
    `;
    
    const queryParamsWithLimit = [Number(limit), offset, ...queryParams];
    const result = await query(achievementsQuery, queryParamsWithLimit);

    const totalPages = Math.ceil(total / Number(limit));

    const response: ApiResponse<Achievement[]> = {
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
    console.error('Error fetching achievements:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch achievements',
    });
  }
};

// Get achievement by ID
export const getAchievementById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM achievements WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Achievement not found',
      });
      return;
    }

    const response: ApiResponse<Achievement> = {
      success: true,
      data: result.rows[0],
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching achievement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch achievement',
    });
  }
};

// Get achievements by category
export const getAchievementsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    // Get total count for category
    const countResult = await query(
      'SELECT COUNT(*) FROM achievements WHERE category = $1',
      [category]
    );
    const total = parseInt(countResult.rows[0].count);

    // Get achievements for category
    const result = await query(
      `SELECT * FROM achievements 
       WHERE category = $1 
       ORDER BY year DESC 
       LIMIT $2 OFFSET $3`,
      [category, Number(limit), offset]
    );

    const totalPages = Math.ceil(total / Number(limit));

    const response: ApiResponse<Achievement[]> = {
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
    console.error('Error fetching achievements by category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch achievements',
    });
  }
};

// Create new achievement
export const createAchievement = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      year,
      category,
      image_url,
    } = req.body;

    const result = await query(
      `INSERT INTO achievements (title, description, year, category, image_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, year, category, image_url]
    );

    const response: ApiResponse<Achievement> = {
      success: true,
      data: result.rows[0],
      message: 'Achievement created successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating achievement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create achievement',
    });
  }
};

// Update achievement
export const updateAchievement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      year,
      category,
      image_url,
    } = req.body;

    const result = await query(
      `UPDATE achievements 
       SET title = $1, description = $2, year = $3, category = $4, image_url = $5
       WHERE id = $6
       RETURNING *`,
      [title, description, year, category, image_url, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Achievement not found',
      });
      return;
    }

    const response: ApiResponse<Achievement> = {
      success: true,
      data: result.rows[0],
      message: 'Achievement updated successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating achievement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update achievement',
    });
  }
};

// Delete achievement
export const deleteAchievement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM achievements WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Achievement not found',
      });
      return;
    }

    const response: ApiResponse<null> = {
      success: true,
      message: 'Achievement deleted successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Error deleting achievement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete achievement',
    });
  }
};
