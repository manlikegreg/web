import { Request, Response, NextFunction } from 'express';
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
  
  body('nickname')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Nickname must not exceed 50 characters'),
  
  body('gender')
    .optional()
    .isIn(['male', 'female'])
    .withMessage('Gender must be either male or female'),
  
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Phone must not exceed 30 characters'),
  
  body('whatsapp')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('WhatsApp must not exceed 30 characters'),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Email must be a valid email address'),
  
  body('profilePic')
    .optional()
    .custom((value) => {
      if (!value || value.trim() === '') return true;
      const v = value.trim();
      // Accept relative uploads path
      if (v.startsWith('/uploads/')) return true;
      // Accept absolute URLs
      try {
        new URL(v);
        return true;
      } catch {
        return false;
      }
    })
    .withMessage('Profile picture must be a valid URL or /uploads path'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio must not exceed 500 characters'),
  
  body('body')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Body must not exceed 2000 characters'),
  
  body('contactInfo')
    .optional()
    .custom((value) => {
      if (value === undefined || value === null) return true;
      if (typeof value !== 'string') return false;
      const trimmed = value.trim();
      if (trimmed === '') return true;
      // If it looks like JSON, require valid JSON; otherwise allow plain text up to 1000 chars
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
          JSON.parse(trimmed);
          return true;
        } catch {
          return false;
        }
      }
      return trimmed.length <= 1000;
    })
    .withMessage('Contact info must be valid JSON or plain text up to 1000 chars'),

  body('categories')
    .optional()
    .custom((value) => {
      if (value === undefined || value === null) return true;
      if (Array.isArray(value)) return value.every((v) => typeof v === 'string' && v.length <= 40);
      if (typeof value === 'string') return true; // allow CSV from admin
      return false;
    })
    .withMessage('Categories must be array of strings or CSV'),
];

export const validateTeacher = [
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
  
  body('nickname')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Nickname must not exceed 50 characters'),
  
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Subject must not exceed 100 characters'),
  
  body('gender')
    .optional()
    .isIn(['male', 'female'])
    .withMessage('Gender must be either male or female'),
  
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Phone must not exceed 30 characters'),
  
  body('whatsapp')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('WhatsApp must not exceed 30 characters'),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Email must be a valid email address'),
  
  body('profilePic')
    .optional()
    .custom((value) => {
      if (!value || value.trim() === '') return true;
      const v = value.trim();
      if (v.startsWith('/uploads/')) return true;
      try {
        new URL(v);
        return true;
      } catch {
        return false;
      }
    })
    .withMessage('Profile picture must be a valid URL or /uploads path'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio must not exceed 500 characters'),
  
  body('body')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Body must not exceed 2000 characters'),
  
  body('contactInfo')
    .optional()
    .custom((value) => {
      if (value === undefined || value === null) return true;
      if (typeof value !== 'string') return false;
      const trimmed = value.trim();
      if (trimmed === '') return true;
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
          JSON.parse(trimmed);
          return true;
        } catch {
          return false;
        }
      }
      return trimmed.length <= 1000;
    })
    .withMessage('Contact info must be valid JSON or plain text up to 1000 chars'),
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

  body('coverImageUrl')
    .optional()
    .custom((value) => {
      if (!value || value.trim() === '') return true;
      const v = value.trim();
      if (v.startsWith('/uploads/')) return true;
      try {
        new URL(v);
        return true;
      } catch {
        return false;
      }
    })
    .withMessage('Cover image must be a valid URL or /uploads path'),
];

export const validateGallery = [
  body('imageUrl')
    .trim()
    .notEmpty()
    .withMessage('Image URL is required')
    .custom((value) => {
      if (!value || value.trim() === '') return false;
      const v = value.trim();
      if (v.startsWith('/uploads/')) return true;
      try {
        new URL(v);
        return true;
      } catch {
        return false;
      }
    })
    .withMessage('Image URL must be a valid URL or /uploads path'),
  
  body('caption')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Caption must not exceed 200 characters'),

  body('order')
    .optional()
    .isInt()
    .withMessage('Order must be a number'),

  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Category must not exceed 50 characters'),

  body('type')
    .optional()
    .isIn(['photo', 'video'])
    .withMessage('Type must be either photo or video'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
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
