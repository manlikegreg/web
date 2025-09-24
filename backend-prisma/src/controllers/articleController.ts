import { Request, Response } from 'express';
import { prisma } from '../server.js';
import { ApiResponse, Article } from '../types/index.js';

// GET /api/articles - Get all articles
export const getAllArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          author: true,
        },
      }),
      prisma.article.count(),
    ]);

    const totalPages = Math.ceil(total / Number(limit));

    const response: ApiResponse<Article[]> = {
      success: true,
      data: articles,
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

// GET /api/articles/:id - Get article by ID
export const getArticleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!article) {
      res.status(404).json({
        success: false,
        error: 'Article not found',
      });
      return;
    }

    const response: ApiResponse<Article> = {
      success: true,
      data: article,
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

// POST /api/articles - Create new article
export const createArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, authorId, coverImageUrl } = req.body;

    // Check if author exists
    const author = await prisma.student.findUnique({
      where: { id: authorId },
    });

    if (!author) {
      res.status(400).json({
        success: false,
        error: 'Author not found',
      });
      return;
    }

    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId,
        coverImageUrl: coverImageUrl || null,
      },
      include: {
        author: true,
      },
    });

    const response: ApiResponse<Article> = {
      success: true,
      data: article,
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

// PUT /api/articles/:id - Update article
export const updateArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, authorId, coverImageUrl } = req.body;

    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        content,
        authorId: authorId ?? undefined,
        coverImageUrl: coverImageUrl ?? undefined,
      },
      include: {
        author: true,
      },
    });

    const response: ApiResponse<Article> = {
      success: true,
      data: article,
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

// DELETE /api/articles/:id - Delete article
export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.article.delete({
      where: { id },
    });

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
