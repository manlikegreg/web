"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.createArticle = exports.getArticleById = exports.getAllArticles = void 0;
const server_1 = require("../server");
const getAllArticles = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const [articles, total] = await Promise.all([
            server_1.prisma.article.findMany({
                skip,
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
                include: {
                    author: true,
                },
            }),
            server_1.prisma.article.count(),
        ]);
        const totalPages = Math.ceil(total / Number(limit));
        const response = {
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
    }
    catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch articles',
        });
    }
};
exports.getAllArticles = getAllArticles;
const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await server_1.prisma.article.findUnique({
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
        const response = {
            success: true,
            data: article,
        };
        res.json(response);
    }
    catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch article',
        });
    }
};
exports.getArticleById = getArticleById;
const createArticle = async (req, res) => {
    try {
        const { title, content, authorId } = req.body;
        const author = await server_1.prisma.student.findUnique({
            where: { id: authorId },
        });
        if (!author) {
            res.status(400).json({
                success: false,
                error: 'Author not found',
            });
            return;
        }
        const article = await server_1.prisma.article.create({
            data: {
                title,
                content,
                authorId,
            },
            include: {
                author: true,
            },
        });
        const response = {
            success: true,
            data: article,
            message: 'Article created successfully',
        };
        res.status(201).json(response);
    }
    catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create article',
        });
    }
};
exports.createArticle = createArticle;
const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const article = await server_1.prisma.article.update({
            where: { id },
            data: {
                title,
                content,
            },
            include: {
                author: true,
            },
        });
        const response = {
            success: true,
            data: article,
            message: 'Article updated successfully',
        };
        res.json(response);
    }
    catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update article',
        });
    }
};
exports.updateArticle = updateArticle;
const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        await server_1.prisma.article.delete({
            where: { id },
        });
        const response = {
            success: true,
            message: 'Article deleted successfully',
        };
        res.json(response);
    }
    catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete article',
        });
    }
};
exports.deleteArticle = deleteArticle;
//# sourceMappingURL=articleController.js.map