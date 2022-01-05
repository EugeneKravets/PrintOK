const mongoose = require(`mongoose`);

const addSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[a-z0-9]+$/gm.test(v);
            },
            message: (sn) =>
                `${sn.value} is not the location. This field accept only english lowercase letters, digits`,
        },
        default: `storage`,
        required: [true, `Specify location from printer`],
        trim: true,
        unique: true,
    },
});
const Add = mongoose.model(`Add`, addSchema);
module.exports = Add;
