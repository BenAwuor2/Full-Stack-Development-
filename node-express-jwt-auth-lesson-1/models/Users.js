const mongoose = require("mongoose");
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


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

//Fire a fucntion after user is saved on DB
// userSchema.post("save", function(doc,next) {
//     console.log("New user was created!", doc);
//     next();
// })

//Fire a fucntion before user is saved on DB
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email});

    if (user) {
        const auth = await bcrypt.compare(password,user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password!');
    }
    throw Error("Incorrect Email!");
}

const user = mongoose.model('user', userSchema);

module.exports = user;