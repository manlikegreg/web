const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        error: `Route ${req.originalUrl} not found`,
    });
};
export default notFound;
//# sourceMappingURL=notFound.js.map