const jwt = require('jsonwebtoken');
const User = require('../models/Users');


const requireAuth = ( req, res, next) => {
    const token = req.cookies.jwt;
    

    if (token) {
        jwt.verify(token, "secrate", (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else{
        res.redirect('/login');
    }

}
// Check current user
const checkUser = async function (req, res, next) {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'secrate', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(decodedToken);

                try {
                    let user = await User.findById(decodedToken.id);

                    if (!user) {
                        throw new Error('User not found');
                    }

                    res.locals.user = user;
                    next();
                } catch (error) {
                    console.error(error.message);
                    res.locals.user = null;
                    next();
                }
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };

