function errorHandler(err, req, res, next) {
    // Log the error, for now using console.error
    console.error(err);

    // Check if the error is a MongoDB/Mongoose bad ObjectID error
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Recurso no encontrado' });
    }

    // Check if the error is a validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }

    // For all other errors, send a generic error message
    // In a real application, you might want to send a more
    // specific error message based on the specific error
    return res.status(500).json({ message: 'Algo salió mal' });
}

module.exports = errorHandler;
