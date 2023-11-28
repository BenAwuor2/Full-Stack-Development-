// const user = require("../models/Users");
// const jwt = require('jsonwebtoken');

// const handleErrors = (err) => {
//     console.log(err.message, err.code);
//     let errors = {email:"", password:""};

//     //incorrect email
//     if (err.message === 'Incorrect Email!') {
//         errors.email = 'That email is not registered!'
//     }

//     //incorrect password
//     if (err.message === 'Incorrect password!') {
//         errors.password = 'That password is incorrect!'
//     }

//     //Duplicate Error code
//     if (err.code === 11000) {
//         errors.email = 'That email is already registered'
//         return errors;
//     }

//     //Validate errors
//     if (err.message.includes("user validation failed")) {
//         Object.values(err.errors).forEach(({properties}) => {
//             errors[properties.path] = properties.message
//         });
//     }
//     return errors;
// }
// const maxAge = 3 * 24 * 60 * 60;
// // Creating a token
// const createToken = (id) => {
//     return jwt.sign({id}, 'secret', {
//         expiresIn : maxAge,
//     });
// }

// module.exports.signup_get = function (req, res)  {
//     res.render('signup');
// };

// module.exports.login_get = function (req, res)  {
//     res.render("login");
// };


// module.exports.signup_post =  async function (req, res)  {
//     const { email, password }= req.body;
//     try{
//         const new_user = await user.create({ email, password});
//         const token = createToken(new_user._id);
//         res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
//         res.status(201).json({new_user: new_user._id});
//     }
//     catch (err) {
//         const errors = handleErrors(err);
//         res.status(400).json({errors});
//     }
// };

// module.exports.login_post = async function (req, res)  {
//     const { email, password }= req.body;
//     try{
//         const new_user = await user.login(email, password);
//         const token = createToken(new_user._id);
//         res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
//         res.status(200).json({new_user: new_user._id});
//     }
//     catch (err) {
//         const errors = handleErrors(err);
//         res.status(400).json({errors});
//     }
// };

const user = require("../models/Users");
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    console.error(err.message, err.code);
    let errors = { email: "", password: "" };

    // incorrect email
    if (err.message === 'Incorrect Email!') {
        errors.email = 'That email is not registered!';
    }

    // incorrect password
    if (err.message === 'Incorrect password!') {
        errors.password = 'That password is incorrect!';
    }

    // Duplicate Error code
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }

    // Validate errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    try {
        return jwt.sign({ id }, "secrate", {
            expiresIn: maxAge,
        });
    } catch (err) {
        console.error('Error creating JWT token:', err.message);
        throw new Error('Error creating JWT token');
    }
};

module.exports.signup_get = function (req, res) {
    res.render('signup');
};

module.exports.login_get = function (req, res) {
    res.render('login');
};

module.exports.signup_post = async function (req, res) {
    const { email, password } = req.body;
    try {
        const new_user = await user.create({ email, password });
        const token = createToken(new_user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, secure: true });
        res.status(201).json({ new_user: new_user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.login_post = async function (req, res) {
    const { email, password } = req.body;
    try {
        const new_user = await user.login(email, password);
        const token = createToken(new_user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, secure: true });
        res.status(200).json({ new_user: new_user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect("/");
}
