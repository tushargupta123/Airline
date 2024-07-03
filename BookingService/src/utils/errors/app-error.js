class AppError extends Error {
    constructor(
        name,
        message,
        explanation,
        statusCode
        ){
        super();
        this.name = 'AppError';
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;