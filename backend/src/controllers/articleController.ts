import { Request, Response } from 'express';
import { query } from '../utils/database';
import { Article, ApiResponse, PaginationParams } from '../types';

// Get all articles with pagination
export const getAllArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'published_at',
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
    const countQuery = `SELECT COUNT(*) FROM articles ${whereClause}`;
    const countResult = await query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].count);

    // Get articles
    const articlesQuery = `
      SELECT * FROM articles 
      ${whereClause}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT $1 OFFSET $2
    `;
    
    const queryParamsWithLimit = [Number(limit), offset, ...queryParams];
    const result = await query(articlesQuery, queryParamsWithLimit);

    const totalPages = Math.ceil(total / Number(limit));

    const response: ApiResponse<Article[]> = {
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
    console.error('Error fetching articles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch articles',
    });
  }
};

// Get article by ID
export const getArticleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM articles WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Article not found',
      });
      return;
    }

    const response: ApiResponse<Article> = {
      success: true,
      data: result.rows[0],
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch article',
    });
  }
};

// Get articles by category
export const getArticlesByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    // Get total count for category
    const countResult = await query(
      'SELECT COUNT(*) FROM articles WHERE category = $1',
      [category]
    );
    const total = parseInt(countResult.rows[0].count);

    // Get articles for category
    const result = await query(
      `SELECT * FROM articles 
       WHERE category = $1 
       ORDER BY published_at DESC 
       LIMIT $2 OFFSET $3`,
      [category, Number(limit), offset]
    );

    const totalPages = Math.ceil(total / Number(limit));

    const response: ApiResponse<Article[]> = {
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
    console.error('Error fetching articles by category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch articles',
    });
  }
};

// Create new article
export const createArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      content,
      excerpt,
      author,
      category,
      tags,
      image_url,
    } = req.body;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const result = await query(
      `INSERT INTO articles (title, content, excerpt, author, category, tags, image_url, slug, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING *`,
      [title, content, excerpt, author, category, JSON.stringify(tags), image_url, slug]
    );

    const response: ApiResponse<Article> = {
      success: true,
      data: result.rows[0],
      message: 'Article created successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create article',
    });
  }
};

// Update article
export const updateArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      excerpt,
      author,
      category,
      tags,
      image_url,
    } = req.body;

    const result = await query(
      `UPDATE articles 
       SET title = $1, content = $2, excerpt = $3, author = $4, 
           category = $5, tags = $6, image_url = $7, updated_at = NOW()
       WHERE id = $8
       RETURNING *`,
      [title, content, excerpt, author, category, JSON.stringify(tags), image_url, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Article not found',
      });
      return;
    }

    const response: ApiResponse<Article> = {
      success: true,
      data: result.rows[0],
      message: 'Article updated successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update article',
    });
  }
};

// Delete article
export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM articles WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'Article not found',
      });
      return;
    }

    const response: ApiResponse<null> = {
      success: true,
      message: 'Article deleted successfully',
    };

    res.json(response);
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete article',
    });
  }
};
