const success = (res, data = {}, message = "Request successful", statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

const error = (res, errorMessage = "An error occurred", statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        error: errorMessage,
    });
};

module.exports = {
    success,
    error,
};
