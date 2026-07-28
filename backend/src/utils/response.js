function successResponse(res, status, message, data = null) {
    return res.status(status).json({
        status: 'success',
        message,
        data,
    });
}

function errorResponse(res, status, message, error = null) {
    return res.status(status).json({
        status: 'error',
        message,
        error,
    });
}

module.exports = {
    successResponse,
    errorResponse,
};