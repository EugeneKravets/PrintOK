const { promisify } = require(`util`);
const User = require(`./../models/userModel`);
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require(`./../utils/appError`);

const signToken = (id) => {
    return (token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    }));
};
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
        ),
        httpOnly: true,
        // secure: true, // ONLY FOR HTTPS
    };
    if (process.env.NODE_ENV === `production`) cookieOptions.secure = true;

    res.cookie(`jwt`, token, cookieOptions);

    user.password = undefined; // remove password form output

    res.status(statusCode).json({
        status: `success`,
        token,
        data: {
            user,
        },
    });
};
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        login: req.body.login,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangeAt: req.body.passwordChangeAt,
        role: req.body.role,
    });
    // const token = signToken(newUser.id);
    createSendToken(newUser, 201, res);
    // res.status(201).json({
    //     status: `success`,
    //     token,
    //     data: {
    //         user: newUser,
    //     },
    // });
});
exports.login = catchAsync(async (req, res, next) => {
    const { login, password } = req.body;
    //
    // check if login and password exists
    if (!login || !password) {
        return next(new AppError(`Specify login and password`), 400);
    }
    // check if user exists && password is correct
    //
    const user = await User.findOne({ login }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect login or password', 401));
    }
    // If ok send token to client
    // const token = signToken(user._id);
    createSendToken(user, 200, res);

    // res.status(200).json({
    //     status: `success`,
    //     token,
    // });
});
//
//
exports.logout = (req, res) => {
    res.cookie(`jwt`, `null`, {
        expires: new Date(Date.now() - 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: `success` });
};
//
// Only from render pages no error
exports.isLoggedIn = async (req, res, next) => {
    // console.log(req.cookies.jwt);
    //
    // get token and check of it's there
    if (req.cookies.jwt) {
        try {
            // verification token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );
            // console.log(decoded); information about token
            //
            // check if user still exists
            const CurrentUser = await User.findById(decoded.id);
            if (!CurrentUser) {
                return next();
            }
            //
            // if user change password after token was issued
            if (CurrentUser.changedPasswordAfter(decoded.iat)) {
                return next();
            }
            // THERE IS A LOGGED  in USER
            res.locals.user = CurrentUser;
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};

exports.protect = catchAsync(async (req, res, next) => {
    //
    // get token and check of it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith(`Bearer`)) {
        token = req.headers.authorization.split(` `)[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    // console.log(token);
    if (!token) {
        return next(
            new AppError(`You are not logged in! Please log in to get access`, 401)
        );
    }
    //
    // verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded); information about token
    //
    // check if user still exists
    const CurrentUser = await User.findById(decoded.id);
    if (!CurrentUser) {
        return next(
            new AppError(`The user belonging to this token does no longer exist`, 401)
        );
    }
    //
    // if user change password after token was issued
    if (CurrentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(`User recently changed password! Please log in again`, 401)
        );
    }
    // GRAN ACCESS TO PROTECT ROUTE
    req.user = CurrentUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin'] or roles ['user']
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(`You don't have permission to perform this action`, 403)
            );
        }
        next();
    };
};
