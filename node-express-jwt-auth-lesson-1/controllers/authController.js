const user = require("../models/Users");

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email:"", password:""};
    //Duplicate Error code
    if (err.code === 11000) {
        errors.email = 'That email is already registered'
        return errors;
    }

    //Validate errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        });
    }
    return errors;
}

module.exports.signup_get = function (req, res)  {
    res.render('signup');
};

module.exports.login_get = function (req, res)  {
    res.render("login");
};


module.exports.signup_post =  async function (req, res)  {
    const { email, password }= req.body;
    try{
        const new_user = await user.create({ email, password});
        res.status(201).json(new_user);
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
};

module.exports.login_post = function (req, res)  {
    const { email, password }= req.body;
    console.log(email, password);
    res.send("User Login");
};