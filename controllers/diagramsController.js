const Diagram = require('./../models/diagramModel');
const catchAsync = require(`./../utils/catchAsync`);
const AppError = require('./../utils/appError');

exports.createRecord = catchAsync(async (req, res, next) => {
    const newRecord = await Diagram.create(req.body);
    console.log(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            newRecord,
        },
    });
});

exports.getAllRecords = catchAsync(async (req, res, next) => {
    // console.log(req.query);
    const records = await Diagram.find(req.query);
    res.status(200).json({
        status: 'success',
        results: records.length,
        data: records,
    });
});

exports.getRecord = catchAsync(async (req, res, next) => {
    // console.log(req.params);
    const record = await Diagram.findById(req.params.id);
    if (!record) {
        return next(new AppError('No record found with that id', 404));
    }
    res.status(200).json({
        status: 'success',
        data: record,
    });
});

exports.updateRecord = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const record = await Diagram.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!record) {
        return next(new AppError('No record found with that id', 404));
    }
    res.status(200).json({
        status: 'success',
        data: record,
    });
});

exports.deleteRecord = catchAsync(async (req, res, next) => {
    const record = await Diagram.findByIdAndDelete(req.params.id);
    if (!record) {
        return next(new AppError('No record found with that id', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});

exports.deleteRecords = catchAsync(async (req, res, next) => {
    // console.log(req.query);
    const records = await Diagram.deleteMany(req.query);
    // console.log(records.deletedCount);
    if (records.deletedCount === 0) {
        return next(new AppError('No record found with that parameters', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
