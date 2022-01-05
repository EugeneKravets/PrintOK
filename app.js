'use strict';
const express = require('express');
const app = express();
const path = require(`path`);

// Security practices
const rateLimit = require(`express-rate-limit`);
const helmet = require(`helmet`);
const mongoSanitize = require(`express-mongo-sanitize`);
const xss = require(`xss-clean`);
const hpp = require(`hpp`);
const cors = require(`cors`);

const morgan = require(`morgan`);
const AppError = require('./utils/appError');
const globalErrorHandler = require(`./controllers/errorController`);
const compression = require('compression');

//
const printerRouter = require(`./routes/printerRoutes`);
const userRouter = require(`./routes/userRoutes`);
const viewRouter = require(`./routes/viewRoutes`);
const addRouter = require(`./routes/addRouters`);
const diagramRouter = require(`./routes/diagramRouters`);
//
////
// MIDDLEWARE (step between request and response cycle)
if (process.env.NODE_ENV === `development`) {
    app.use(morgan(`dev`));
}
//
// Set security HTTP HEADERS

app.use(
    cors({
        origin: '*',
    })
);
// app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            // defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
            defaultSrc: ["'self'"],
            fontSrc: [
                'https://fonts.googleapis.com',
                'https://fonts.gstatic.com',
                'https://fonts.googleapis.com',
            ],
            // scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
            scriptSrc: ["'self'", 'http://localhost:3000', 'http://192.168.0.105:3000'],
            styleSrc: [
                "'self'",
                "'unsafe-inline'",
                'http://localhost:3000',
                'http://192.168.0.105:3000',
                'https://fonts.googleapis.com',
            ],
        },
    })
);

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: `Too many requests from this IP, please try again in an hour!`,
});
app.use(`/api`, limiter);
//
// BODY PARSER
// cookieParser // parse cookie in incoming request
const cookieParser = require(`cookie-parser`);
//
app.use(express.json({ limit: `10kb` })); // вычитывает с тела запроса информацию о для создания записи в бд
app.use(cookieParser()); // parse data from cookies
//
// data sanitization against NoSQL query injection
app.use(mongoSanitize());
//
// data sanitization XSS against
app.use(xss());
//
// Prevent parameter pollutions
app.use(hpp());
//

// SERVING STATIC FILE
app.use(express.static(path.join(__dirname, `public`)));
//
// app.use((req, res, next) => {
//     console.log(`Hello form middleware😉`);
//     next();
// });
app.use(compression());
//
// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies); // look at cookies from browser
    // console.log(req.headers); // посмт. заголовки запроса в express
    next();
});

//
// VIEW PAGE ENGINE
app.set(`view engine`, `pug`);
app.set(`views`, path.join(__dirname, `views`));
////
// // Read file with tours
// const printers = JSON.parse(
//     fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );
//
// ROUTE HANDLERS
// const getAllPrinters = (req, res, next) => {
//     res.status(200).json({
//         status: `success`,
//         requestedAt: req.requestTime,
//         results: printers.length,
//         data: printers,
//     });
// };
// const getPrinter = (req, res, next) => {
//     // `/api/v1/printers/:id/:id2?` ? optional parameters
//     // all variables are calls parameters req.params are options of url query
//     // console.log(req.params);
//     // query parameters from url string 127.0.0.1:3000/api/v1/printers/1
//     const id = Number(req.params.id);
//     const printer = printers.find((el) => el.id === id);
//     // if (id > printers.length) {
//     if (!printer) {
//         return res.status(404).json({
//             status: `fail`,
//             message: `Invalid ID`,
//         });
//     }
//     res.status(200).json({
//         status: `success`,
//         data: printer,
//     });
// };
// const createPrinter = (req, res, next) => {
//     // console.log(req.body); // body property available on the request app.use(express.json());
//     const newID = printers[printers.length - 1].id + 1;
//     const newPrinter = Object.assign({ id: newID }, req.body);
//     printers.push(newPrinter);
//     fs.writeFile(
//         `${__dirname}/dev-data/data/tours-simple.json`,
//         JSON.stringify(printers),
//         (err) => {
//             res.status(201).json({
//                 message: `success`,
//                 data: {
//                     tour: newPrinter,
//                 },
//             });
//         }
//     );
// };
// const updatePrinter = (req, res, next) => {
//     if (Number(req.params.id) > printers.length) {
//         return res.status(404).json({
//             status: `fail`,
//             message: `Invalid ID`,
//         });
//     }
//     res.status(200).json({
//         status: `success`,
//         data: {
//             printer: `<Update printer here....>`,
//         },
//     });
// };
// const deletePrinter = (req, res, next) => {
//     if (Number(req.params.id) > printers.length) {
//         return res.status(404).json({
//             status: `fail`,
//             message: `Invalid ID`,
//         });
//     }
//     res.status(204).json({
//         status: `success`,
//         data: null,
//     });
// };
// //
// // USERS HANDLERS
// const getAllUsers = (req, res, next) => {
//     res.status(500).json({
//         status: `error`,
//         message: `This route is not yet defined`,
//     });
// };
// const getUser = (req, res, next) => {
//     res.status(500).json({
//         status: `error`,
//         message: `This route is not yet defined`,
//     });
// };
// const createUser = (req, res, next) => {
//     res.status(500).json({
//         status: `error`,
//         message: `This route is not yet defined`,
//     });
// };
// const updateUser = (req, res, next) => {
//     res.status(500).json({
//         status: `error`,
//         message: `This route is not yet defined`,
//     });
// };
// const deleteUser = (req, res, next) => {
//     res.status(500).json({
//         status: `error`,
//         message: `This route is not yet defined`,
//     });
// };
// OLD ROUTES
// GET ALL PRINTERS
// app.get(`/api/v1/printers`, getAllPrinters);
// GET PRINTER
// app.get(`/api/v1/printers/:id`, getPrinter);
// POST DATA TO THE SERVER
// app.post(`/api/v1/printers`, createPrinter);
// app.patch(`/api/v1/printers/:id`, updatePrinter);
// app.delete(`/api/v1/printers/:id`, deletePrinter);

// ROUTES
app.use(`/`, viewRouter);
// const printerRouter = express.Router();
app.use(`/api/v1/printers`, printerRouter);
// const userRouter = express.Router();
app.use(`/api/v1/users`, userRouter);
//
//
app.use(`/api/v1/add`, addRouter);
//
//
app.use(`/api/v1/diagram`, diagramRouter);
//
//
app.all(`*`, (req, res, next) => {
    // res.status(404).json({
    //     status: `fail`,
    //     message: `Can't find ${req.originalUrl} on this server!`,
    // });
    // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    // err.status = `fail`;
    // err.statusCode = 404;
    // next(err); // Если в параметре next(err) стоит что-то то это значаит что там будет ошибка и его перехватит global error handler
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
//
// Global error handler
app.use(globalErrorHandler);

// printerRouter.route(`/`).get(getAllPrinters).post(createPrinter);
// printerRouter.route(`/:id`).get(getPrinter).patch(updatePrinter).delete(deletePrinter);
//
// USER routes
// userRouter.route(`/`).get(getAllUsers).post(createUser);
// userRouter.route(`/:id`).get(getUser).patch(updateUser).delete(deleteUser);
//
// Start server
module.exports = app;
