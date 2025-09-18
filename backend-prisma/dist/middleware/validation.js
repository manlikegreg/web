"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateGallery = exports.validateArticle = exports.validateStudent = void 0;
const express_validator_1 = require("express-validator");
exports.validateStudent = [
    (0, express_validator_1.body)('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    (0, express_validator_1.body)('role')
        .trim()
        .notEmpty()
        .withMessage('Role is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Role must be between 2 and 50 characters'),
    (0, express_validator_1.body)('profilePic')
        .optional()
        .isURL()
        .withMessage('Profile picture must be a valid URL'),
    (0, express_validator_1.body)('bio')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Bio must not exceed 500 characters'),
];
exports.validateArticle = [
    (0, express_validator_1.body)('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 5, max: 200 })
        .withMessage('Title must be between 5 and 200 characters'),
    (0, express_validator_1.body)('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ min: 10 })
        .withMessage('Content must be at least 10 characters long'),
    (0, express_validator_1.body)('authorId')
        .trim()
        .notEmpty()
        .withMessage('Author ID is required')
        .isLength({ min: 1 })
        .withMessage('Author ID must be provided'),
];
exports.validateGallery = [
    (0, express_validator_1.body)('imageUrl')
        .trim()
        .notEmpty()
        .withMessage('Image URL is required')
        .isURL()
        .withMessage('Image URL must be a valid URL'),
    (0, express_validator_1.body)('caption')
        .optional()
        .isLength({ max: 200 })
        .withMessage('Caption must not exceed 200 characters'),
];
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
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
exports.handleValidationErrors = handleValidationErrors;
//# sourceMappingURL=validation.js.map