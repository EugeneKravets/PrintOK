const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);
const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: [true, `Specify the login`],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, `Specify the password`],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, `Confirm your password`],
        validate: {
            // this only work on save or create
            validator: function (el) {
                return el === this.password;
            },
            message: `Password are not the same`,
        },
    },
    role: {
        type: String,
        enum: [`user`, `admin`],
        default: `user`,
    },
    passwordChangeAt: Date,
});

// between getting the data and saved it into DB - .pre(`save`) hook
userSchema.pre(`save`, async function (next) {
    // only run this function if password was actually modified
    if (!this.isModified(`password`)) return next();
    // Hash the password
    this.password = await bcrypt.hash(this.password, 14);
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});
//
//
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangeAt) {
        const changedTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
        // console.log(changedTimestamp, JWTTimeStamp);

        return JWTTimeStamp < changedTimestamp;
    }
    // False not change
    return false;
};
//
const User = mongoose.model(`User`, userSchema);
module.exports = User;
