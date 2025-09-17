import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from '../types';

const errorHandler = (
  err: Error | DatabaseError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err };
  error.message = err.message;

  console.error('Error:', err);

  // PostgreSQL errors
  if ('code' in err) {
    const dbError = err as DatabaseError;
    switch (dbError.code) {
      case '23505': // Unique violation
        error.message = 'Resource already exists';
        break;
      case '23503': // Foreign key violation
        error.message = 'Referenced resource not found';
        break;
      case '23502': // Not null violation
        error.message = 'Required field is missing';
        break;
      case '42P01': // Undefined table
        error.message = 'Database table not found';
        break;
      default:
        error.message = 'Database error occurred';
    }
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    error.message = 'Validation failed';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
  }

  res.status(500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
