const mongoose = require("mongoose");
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, "This is not a valid email"]
    },
    password : {
        type: String,
        required:  [true, 'Please enter a valid password'],
        minlength: [6, 'Minimum password length is 6-xters'],
    }
});

const user = mongoose.model('user', userSchema);

module.exports = user;