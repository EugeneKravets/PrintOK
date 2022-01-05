const mongoose = require('mongoose');
const diagramsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    counter: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^$|[0-9]+$/gm.test(v);
            },
            message: (n) =>
                `${n.value} is not a valid counter. This field accept only digits 0-9 or empty string`,
        },
    },
    year: {
        type: String,
        trim: true,
    },
    // January: {
    //     type: String,
    //     trim: true,
    //     validate: {
    //         validator: function (v) {
    //             return /^[0-9]+$/gm.test(v);
    //         },
    //         message: (n) =>
    //             `${n.value} is not a valid counter. This field accept only digits 0-9 `,
    //     },
    // },
});
const Diagrams = mongoose.model('Diagrams', diagramsSchema);
module.exports = Diagrams;
