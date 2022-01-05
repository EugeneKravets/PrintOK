const catchAsync = require('../utils/catchAsync');
const User = require(`./../models/userModel`);
//
// USERS HANDLERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        status: `success`,
        results: users.length,
        data: {
            users: users,
        },
    });
});
exports.getUser = (req, res, next) => {
    res.status(500).json({
        status: `error`,
        message: `This route is not yet defined`,
    });
};
exports.createUser = (req, res, next) => {
    res.status(500).json({
        status: `error`,
        message: `This route is not yet defined`,
    });
};
exports.updateUser = (req, res, next) => {
    res.status(500).json({
        status: `error`,
        message: `This route is not yet defined`,
    });
};
exports.deleteUser = (req, res, next) => {
    res.status(500).json({
        status: `error`,
        message: `This route is not yet defined`,
    });
};
