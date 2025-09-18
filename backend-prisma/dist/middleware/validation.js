import { body, validationResult } from 'express-validator';
export const validateStudent = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    body('role')
        .trim()
        .notEmpty()
        .withMessage('Role is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Role must be between 2 and 50 characters'),
    body('profilePic')
        .optional()
        .isURL()
        .withMessage('Profile picture must be a valid URL'),
    body('bio')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Bio must not exceed 500 characters'),
];
export const validateArticle = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 5, max: 200 })
        .withMessage('Title must be between 5 and 200 characters'),
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ min: 10 })
        .withMessage('Content must be at least 10 characters long'),
    body('authorId')
        .trim()
        .notEmpty()
        .withMessage('Author ID is required')
        .isLength({ min: 1 })
        .withMessage('Author ID must be provided'),
];
export const validateGallery = [
    body('imageUrl')
        .trim()
        .notEmpty()
        .withMessage('Image URL is required')
        .isURL()
        .withMessage('Image URL must be a valid URL'),
    body('caption')
        .optional()
        .isLength({ max: 200 })
        .withMessage('Caption must not exceed 200 characters'),
];
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors.array(),
        });
        return;
    }
    next();
};
//# sourceMappingURL=validation.js.map