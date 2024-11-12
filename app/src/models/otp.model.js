const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    otp: { type: String },
    otpExpires: { type: Date }
});

module.exports = mongoose.model('otp', userSchema);
