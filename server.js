'use strict';
const path = require(`path`);
const https = require(`https`);
const fs = require(`fs`);

const dotenv = require(`dotenv`);
const mongoose = require(`mongoose`);
//
const socketIo = require(`socket.io`);
const ping = require(`ping`);
const Printer = require(`./models/printerModel`);

//
process.on(`uncaughtException`, (err) => {
    console.log(err.name, err.message);
    console.log(`UNCAUGHT EXCEPTION 🧨🧨🧨 Shutdown...`);
    process.exit(1);
});

dotenv.config({ path: `${__dirname}/config.env` });
const app = require(`./app`);

console.log(app.get(`env`));
// console.log(process.env);
//
// Connect DB
const DB = process.env.DATABASE.replace(`<PASSWORD>`, process.env.DATABASE_PASSWORD);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((con) => {
        // console.log(con.connections); // show information about connections
        // console.log(con); // show information about connections
        console.log(`DB connection successful`);
    });
const printers = async function getData() {
    const pr = await Printer.find().select('_id, ip');
    return pr;
};
async function pingTest() {
    const printersIdIp = await printers();
    // console.log(printersIdIp);
    printersIdIp.forEach(async (el) => {
        let res = await ping.promise.probe(el.ip);
        if (res.alive !== true) {
            console.log(`${res.alive} + ${el._id}`);
            const updateInfo = await Printer.findByIdAndUpdate(
                el._id,
                { isActive: 'false' },
                { new: true }
            );
        }
        if (res.alive) {
            const updateInfo = await Printer.findByIdAndUpdate(
                el._id,
                { isActive: 'true' },
                { new: true }
            );
        }
    });
}
pingTest();

setTimeout(async function tick() {
    await pingTest();
    io.emit(`ping`, `reload page`);
    setTimeout(tick, 60000);
}, 60000);

// (async function pingTest() {
//     const printersIdIp = await printers();
//     // console.log(printersIdIp);
//     printersIdIp.forEach(async (el) => {
//         let res = await ping.promise.probe(el.ip);
//         if (res.alive !== true) {
//             console.log(`${res.alive} + ${el._id}`);
//             const updateInfo = await Printer.findByIdAndUpdate(
//                 el._id,
//                 { isActive: 'false' },
//                 { new: true }
//             );
//         }
//     });
// })();
const port = process.env.PORT || 3000;
let server;
if (process.env.NODE_ENV === `development`) {
    server = app.listen(port, () => {
        console.log(`app running on ${port}`);
    });
}
if (process.env.NODE_ENV === `production`) {
    server = https.createServer(
        {
            key: fs.readFileSync(path.join(__dirname, `cert`, `key.pem`)),
            cert: fs.readFileSync(path.join(__dirname, `cert`, `cert.pem`)),
        },
        app
    );
    server.listen(`3443`, () => console.log(`secure server on port 3443`));
}

////////////////////////////////////////
// Socket IO section
// //
const io = socketIo(server); // run express with socketIO

io.on(`connection`, (socket) => {
    //
    socket.emit('welcome', `socketIo server!!!`);
    //
    socket.on(`messageToServer`, (msg) => {
        console.log(msg);
    });

    // socket.on(`messageToServer`, (messageToServer) => {
    //     console.log(`${messageToServer}-- data from client`);
    // });
});

///////////////////////////////////////////////////////////////
// async function pingTest(hosts) {
//     for (let host of hosts) {
//         let res = await ping.promise.probe(host);
//         console.log(`${res.alive} and  ${res.numeric_host}`);
//     }
//     console.log(`ping finished`);
//     return true;
// }
// pingTest(hostsArr);
//

process.on(`unhandledRejection`, (err) => {
    console.log(err.name, err.message);
    console.log(`UNHANDLED REJECTION 🧨🧨🧨 Shutdown...`);
    server.close(() => {
        process.exit(1);
    });
});
