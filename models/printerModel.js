const mongoose = require(`mongoose`);

const printerSchema = new mongoose.Schema({
    model: {
        type: String,
        // Custom validator
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9-]+$/gm.test(v);
            },
            message: (sn) =>
                `${sn.value} is not the model. This field accept only lowercase and uppercase letters, digits and '-'`,
        },
        required: [true, `Specify the model printer`],
        trim: true,
        minLength: 2,
    },
    sn: {
        type: String,
        // match: /^[A-Za-z0-9_-]+$/gm,

        // Custom validator
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9]+$/gm.test(v);
            },
            message: (sn) =>
                `${sn.value} is not a valid serial number. This field accept only lowercase and uppercase letters, digits`,
        },
        required: [true, `Specify the serial number for printer`],
        unique: true,
        trim: true,
        minLength: 2,
    },
    ip: {
        type: String,
        // match: /^[0-9.]+$/gm,
        // Custom validator
        validate: {
            validator: function (v) {
                return /^[0-9.]+$/gm.test(v);
            },
            message: (ip) =>
                `${ip.value} is not a valid ip address. This field accept only digits 0-9 and "." symbol`,
        },
        required: [true, `Specify ip address from printer`],
        unique: true,
        trim: true,
        minLength: 2,
    },

    location: {
        type: String,
        // Custom validator
        // validate: {
        //     validator: function (v) {
        //         return /^[A-ZА-Юа-юa-z0-9 ]+$/gm.test(v);
        //     },
        //     message: (v) =>
        //         `${v.value} is not valid the location. This field accept only russian, english lowercase and uppercase letters and digits`,
        // },
        required: [true, `Specify location from printer`],
        // trim: true,
        // minLength: 2,
    },
    department: {
        type: String,
        // Custom validator
        validate: {
            validator: function (v) {
                return /^[A-ZА-Юа-юa-z0-9- ]+$/gm.test(v);
            },
            message: (v) =>
                `${v.value} is not the valid department. This field accept only russian, english lowercase and uppercase letters, digits, '-', ' ' symbols`,
        },
        trim: true,
        minLength: 2,
    },
    owner: {
        type: String,
        // Custom validator
        validate: {
            validator: function (v) {
                return /^[A-ZА-Юа-юa-z0-9- ]+$/gm.test(v);
            },
            message: (v) =>
                `${v.value} is not a valid owner. This field accept only russian, english lowercase and uppercase letters, digits, '-', ' ' symbols`,
        },
        trim: true,
        minLength: 2,
    },
    contract: {
        type: String,
        // Custom validator
        validate: {
            validator: function (v) {
                return /^[A-ZА-Юа-юa-z0-9- ]+$/gm.test(v);
            },
            message: (v) =>
                `${v.value} is not a valid contract number. This field accept only russian, english lowercase and uppercase letters, digits, '-', ' ' symbols`,
        },
        trim: true,
    },
    returns: {
        type: String,
        default: false,
        enum: {
            values: ['false', 'true'],
            message: `This field accept only lowercase 'true' and 'false' values`,
        },
        required: [true, `This field accept only lowercase 'true' and 'false' values`],
        trim: true,
    },
    notes: {
        type: String,
        trim: true,
    },
    isActive: {
        type: String,
        trim: true,
        default: true,
    },
    comment: {
        type: String,
        trim: true,
        default: '',
    },
});
const Printer = mongoose.model(`Printer`, printerSchema);
module.exports = Printer;
