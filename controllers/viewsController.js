const AppError = require('../utils/appError');
const Printer = require(`./../models/printerModel`);
const Add = require(`./../models/addModel`);
const Diagram = require(`./../models/diagramModel`);
const User = require(`./../models/userModel`);
const catchAsync = require(`./../utils/catchAsync`);

exports.login = (req, res) => {
    res.status(200).render(`login`, {
        title: ` Login`,
    });
};

exports.inventory = catchAsync(async (req, res) => {
    //
    // get inventory data form db
    // console.log(req.query); // получить строку филтра с http://localhost:3000/inventory?location=rc7
    const printers = await Printer.find(req.query).select('-__v');
    // console.log(printers);
    // const printers = await Printer.find(req.query).select('-__v');
    // console.log(res.locals.user.role); // show current login user
    const userRole = res.locals.user.role;
    const locations = await Add.find().select('-__v');
    locations.sort((a, b) => {
        const aNum = parseInt(a.name.slice(2));
        const bNum = parseInt(b.name.slice(2));
        return aNum - bNum;
    });
    const columnName = Object.keys(Printer.schema.tree).splice(0, 10);

    // render the template
    res.status(200).render(`inventory`, {
        title: ` Inventory`,
        printers,
        columnName,
        locations,
        userRole,
    });
});

exports.diagrams = catchAsync(async (req, res) => {
    const records = await Diagram.find(req.query).select(`-__v -_id`);
    // console.log(req.query);
    const getAllYears = await Diagram.find().select(`-__v -_id -name -counter`);
    const months = records.map((element) => element.name);
    const counters = records.map((element) => Number(element.counter));
    const ys = new Set(getAllYears.map((element) => Number(element.year)));
    const years = Array.from(ys).sort();
    const userRole = res.locals.user.role;
    // console.log(`months=`, months);
    // console.log(`counters=`, counters);
    res.status(200).render(`diagrams`, {
        title: ` Diagrams`,
        records,
        months,
        counters,
        years,
        userRole,
    });
});

exports.addnewYear = catchAsync(async (req, res, next) => {
    const getCurrentYear = String(new Date().getFullYear());
    // const newYear = Number(getCurrentYear) + 1;
    const newYear = Number(getCurrentYear);
    const newYearRecords = await Diagram.find({ year: newYear }).select(
        `-__v -name -counter -_id`
    );
    const lengthYear = newYearRecords.length;
    console.log(lengthYear);
    const records = await Diagram.find(req.query).select(`-__v`);
    const firstPart = records.slice(0, 6);
    const secondPart = records.slice(6, 12);
    const userRole = res.locals.user.role;

    res.status(200).render(`addNewYear`, {
        title: ` Add new year`,
        firstPart,
        secondPart,
        lengthYear,
        userRole,
    });
});

exports.editCounters = catchAsync(async (req, res, next) => {
    const records = await Diagram.find(req.query).select(`-__v`);
    // console.log(records.length);
    const firstPart = records.slice(0, 6);
    // console.log(firstPart);
    const secondPart = records.slice(6, 13);
    // console.log(`secondPart=`, secondPart);
    res.status(200).render(`editCounters`, {
        title: ` Edit Counters`,
        firstPart,
        secondPart,
    });
});

exports.monitoring = catchAsync(async (req, res, next) => {
    let printers;
    if (Object.keys(req.query).length === 0) {
        printers = await Printer.find({ isActive: false }).select('-__v');
    } else {
        printers = await Printer.find(req.query).select('-__v');
    }

    const locations = await Add.find().select('-__v');
    locations.sort((a, b) => {
        const aNum = parseInt(a.name.slice(2));
        const bNum = parseInt(b.name.slice(2));
        return aNum - bNum;
    });
    res.status(200).render(`monitoring`, {
        title: ` Monitoring`,
        locations,
        printers,
    });
});
exports.returns = catchAsync(async (req, res) => {
    // console.log(Object.keys(req.query).length);
    let printers;
    if (Object.keys(req.query).length === 0) {
        printers = await Printer.find({ returns: true }).select('-__v');
    } else {
        printers = await Printer.find(req.query).select('-__v');
    }

    const locations = await Add.find().select('-__v');
    locations.sort((a, b) => {
        const aNum = parseInt(a.name.slice(2));
        const bNum = parseInt(b.name.slice(2));
        return aNum - bNum;
    });
    const columnName = Object.keys(Printer.schema.tree).splice(0, 10);
    const userRole = res.locals.user.role;
    res.status(200).render(`returns`, {
        title: ` Returns`,
        printers,
        locations,
        columnName,
        userRole,
    });
});

exports.add = catchAsync(async (req, res) => {
    const locations = await Add.find().select('-__v');
    const userRole = res.locals.user.role;
    locations.sort((a, b) => {
        const aNum = parseInt(a.name.slice(2));
        const bNum = parseInt(b.name.slice(2));
        return aNum - bNum;
    });
    res.status(200).render(`add`, {
        title: ` Add Information`,
        locations,
        userRole,
    });
});

exports.addPrinter = catchAsync(async (req, res, next) => {
    const locations = await Add.find().select('-__v');
    locations.sort((a, b) => {
        const aNum = parseInt(a.name.slice(2));
        const bNum = parseInt(b.name.slice(2));
        return aNum - bNum;
    });
    res.status(200).render(`addPrinter`, {
        title: `| Add Printer`,
        locations,
    });
});
exports.editPrinter = catchAsync(async (req, res, next) => {
    const printer = await Printer.findByIdAndUpdate(req.params.id, {
        new: true,
        runValidators: true,
    });

    const locations = await Add.find().select('-__v');
    locations.sort((a, b) => {
        const aNum = parseInt(a.name.slice(2));
        const bNum = parseInt(b.name.slice(2));
        return aNum - bNum;
    });
    // if (!printer) {
    //     return next(new AppError(`There no printer with that id`, 404));
    // }
    res.status(200).render(`editPrinter`, {
        title: `| Edit Settings`,
        printer,
        locations,
    });
});
