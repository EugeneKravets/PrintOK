const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const field = Object.keys(err.keyValue);
    const value = Object.values(err.keyValue);
    const message = `Duplicate field ${field} with value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);

    const message = `Invalid input data ${errors.join(`. `)}`;
    return new AppError(message, 400);
};

const handleJWTError = (err) => {
    return new AppError(`Invalid token. Please login again`, 401);
};

const handleJWTExpiredError = (err) => {
    return new AppError(`Your toke has expired! Please login again`, 401);
};
const sendErrorDev = (err, res, req) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err,
        });
    }
    console.error(`ERROR🧨`, err);
    return res.status(err.statusCode).render(`error`, {
        title: `Something went wrong`,
        msg: err.message,
    });
};

const sendErrorProd = (err, res, req) => {
    if (req.originalUrl.startsWith('/api')) {
        // Operational error
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        console.error(`ERROR🧨`, err);
        // Programming or other error unknown error
        return res.status(500).json({
            status: `error`,
            message: `Something went wrong!`,
        });
    }

    if (err.isOperational) {
        return res.status(err.statusCode).render(`error`, {
            title: `Something went wrong`,
            msg: err.message,
        });
        // Programming or other error unknown error
    }
    console.error(`ERROR🧨`, err);

    return res.status(err.statusCode).render(`error`, {
        title: `Something went wrong`,
        msg: `Please try again later`,
    });
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || `error`;

    if (process.env.NODE_ENV === `development`) {
        sendErrorDev(err, res, req);
    } else if (process.env.NODE_ENV === `production`) {
        let error = Object.create(err);
        if (err.name === `CastError`) error = handleCastErrorDB(err);
        if (err.code === 11000) error = handleDuplicateFieldsDB(err);
        if (err.name === `ValidationError`) error = handleValidationErrorDB(err);
        if (err.name === `JsonWebTokenError`) error = handleJWTError(err);
        if (err.name === `TokenExpiredError`) error = handleJWTExpiredError(err);
        sendErrorProd(error, res, req);
    }
};
