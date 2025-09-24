const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    console.error('Error:', err);
    if (err.name === 'PrismaClientKnownRequestError') {
        error.message = 'Database operation failed';
    }
    if (err.name === 'PrismaClientValidationError') {
        error.message = 'Invalid data provided';
    }
    if (err.name === 'ValidationError') {
        error.message = 'Validation failed';
    }
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
//# sourceMappingURL=errorHandler.js.map