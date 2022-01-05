const catchAsync = require(`./../utils/catchAsync`);
const Add = require('./../models/addModel');
const AppError = require('./../utils/appError');

exports.getAllLocations = catchAsync(async (req, res, next) => {
    const locations = await Add.find().select('-__v');
    res.status(200).json({
        status: `success`,
        results: locations.length,
        data: {
            locations: locations,
        },
    });
});

exports.createLocation = catchAsync(async (req, res, next) => {
    const newLocation = await Add.create(req.body);
    res.status(201).json({
        message: `success`,
        data: {
            newLocation: newLocation,
        },
    });
});

exports.getLocation = catchAsync(async (req, res, next) => {
    const location = await Add.findById(req.params.id).select('-__v');

    if (!location) {
        return next(new AppError(`No location found with that id`, 404));
    }
    res.status(200).json({
        status: `success`,
        data: {
            location: location,
        },
    });
});

exports.updateLocation = catchAsync(async (req, res, next) => {
    const location = await Add.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // return new document
        runValidators: true, // run validators
    }).select('-__v');

    if (!location) {
        return next(new AppError(`No location found with that id`, 404));
    }
    res.status(200).json({
        status: `success`,
        data: {
            location: location,
        },
    });
});
exports.deleteLocation = catchAsync(async (req, res, next) => {
    console.log(req.params.id);
    const location = await Add.findByIdAndDelete(req.params.id);

    if (!location) {
        return next(new AppError(`No location found with that id`, 404));
    }
    res.status(204).json({
        status: `success`,
        data: null,
    });
});
