import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err };
  error.message = err.message;

  console.error('Error:', err);

  // Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    error.message = 'Database operation failed';
  }

  if (err.name === 'PrismaClientValidationError') {
    error.message = 'Invalid data provided';
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
