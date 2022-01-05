const Printer = require(`./../models/printerModel`);
const catchAsync = require(`./../utils/catchAsync`);
const AppError = require('./../utils/appError');
// Read file with tours
// const printers = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );
//
//
// exports.checkId = (req, res, next, val) => {
//     console.log(`Printer id is ${val}`);
//     if (Number(req.params.id) > printers.length) {
//         return res.status(404).json({
//             status: `fail`,
//             message: `Invalid ID`,
//         });
//     }
//     next();
// };
//
//
// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.ip) {
//         return res.status(400).json({
//             status: `fail`,
//             message: `Missing name or ip`,
//         });
//     }
//     next();
// };

//
// ROUTE HANDLERS
exports.getAllPrinters = catchAsync(async (req, res, next) => {
    // console.log(req.query); // получить строку филтра с URL 127.0.0.1:3000/api/v1/printers?location=RC8
    const queryObj = { ...req.query }; // исключить опред слова филтра из строки запроса
    const excludedFields = ['page', 'sort'];
    excludedFields.forEach((el) => delete queryObj[el]);

    const query = Printer.find(req.query).select('-__v');
    const printers = await query;
    // const printers = await Printer.find().where('location').equals('RC7'); // query by mongoose methods

    res.status(200).json({
        status: `success`,
        results: printers.length,
        data: {
            printers: printers,
        },
    });
    // try {
    // } catch (err) {
    //     res.status(404).json({
    //         status: `fail`,
    //         message: err,
    //     });
    // }
});

exports.getPrinter = catchAsync(async (req, res, next) => {
    // `/api/v1/printers/:id/:id2?` ? optional parameters
    // all variables are calls parameters req.params are options of url query
    // console.log(req.params);
    // query parameters from url string 127.0.0.1:3000/api/v1/printers/1
    const printer = await Printer.findById(req.params.id).select('-__v');
    if (!printer) {
        return next(new AppError(`No printer found with that id`, 404));
    }
    res.status(200).json({
        status: `success`,
        data: {
            printer: printer,
        },
    });
    // try {
    // } catch (err) {
    //     res.status(404).json({
    //         status: `fail`,
    //         message: err,
    //     });
    // }
});

exports.createPrinter = catchAsync(async (req, res, next) => {
    // const newPrinter = new Printer({})
    // newPrinter.save() имеет досту к самому документу та как
    //  Printer.create имеет досту к самомой схеме

    // console.log(req.body); // body property available on the request app.use(express.json());
    const newPrinter = await Printer.create(req.body);

    res.status(201).json({
        message: `success`,
        data: {
            newPrinter: newPrinter,
        },
    });
    // try {
    // } catch (err) {
    //     res.status(400).json({
    //         status: `fail`,
    //         message: err,
    //     });
    // }
});

exports.updatePrinter = catchAsync(async (req, res, next) => {
    const printer = await Printer.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // return new document
        runValidators: true, // run validators
    }).select('-__v');

    if (!printer) {
        return next(new AppError(`No printer found with that id`, 404));
    }

    res.status(200).json({
        status: `success`,
        data: {
            printer: printer,
        },
    });
    // try {
    // } catch (err) {
    //     res.status(404).json({
    //         status: `fail`,
    //         message: err,
    //     });
    // }
});

exports.deletePrinter = catchAsync(async (req, res, next) => {
    const printer = await Printer.findByIdAndDelete(req.params.id);

    if (!printer) {
        return next(new AppError(`No printer found with that id`, 404));
    }

    res.status(204).json({
        status: `success`,
        data: null,
    });
    // try {
    // } catch (err) {
    //     res.status(404).json({
    //         status: `fail`,
    //         message: err,
    //     });
    // }
});
