const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

const NAME_PATTERN = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;

function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a valid email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 5) {
        isFormValid = false;
        errors.password = 'Password must be at least 5 characters long.';
    }

    if (!payload || payload.password !== payload.confirmPassword) {
        isFormValid = false;
        errors.passwordsDontMatch = 'Passwords do not match!';
    }

    if (!payload || typeof payload.fullname !== 'string' || !validator.matches(payload.fullname, NAME_PATTERN, 'i')) {
        isFormValid = false;
        errors.fullname = 'Please provide your name.';
    }

    

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address.';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
        message = 'Check the form for errors.';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}


module.exports = {

    register: (req, res) => {

        const validationResult = validateSignupForm(req.body);
     
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            });
        }

        return passport.authenticate('local-signup', (err, token) => {
           
            if (err || !token) {
                return res.status(401).json({
                    success: false,
                    message: 'Email is already taken',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'You have successfully signed up! Now you should be able to log in.'
            });
        })(req, res)
    },

    login: (req, res) => {

        const validationResult = validateLoginForm(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: validationResult.message,
                errors: validationResult.errors
            });
        }

        return passport.authenticate('local-login', (err, token, userData) => {
            if (err) {
                if (err.name === 'IncorrectCredentialsError') {
                    console.log('Invalid credentials');
                    return res.status(401).json({
                        success: false,
                        message: err.message
                    });
                }

                return res.status(401).json({
                    success: false,
                    message: 'Could not process the form.'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'You have successfully logged in!',
                token,
                user: userData
            });
        })(req, res)
    },

    getProfile: (req, res) => {
        
        let id = req.user.id;

        User.findById(id)
            .populate('donations').populate('volounteerTo')
            .then((user) => {
                if (!user) {
                    return res.status(401).json({
                        message: `User not found in our database`
                    });
                }
                //console.log(user);
                return res.status(200).json(user);
            })
            .catch((err) => {
                console.log(err);
                return res.status(401).json({
                    message: 'Something went wrong, please try again.'
                });
            });
    }
};