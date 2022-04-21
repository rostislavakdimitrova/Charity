const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const encryption = require('../utils/encryption');

const secret = '1l0v3w1n3';

module.exports = {
    localRegister: () => {
        return new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false,
            passReqToCallback: true
        }, (req, email, password, done) => {
            
            const salt = encryption.generateSalt();
            const hashedPassword = encryption.generateHashedPassword(salt, password);
    
            User.create({ 
                email, 
                hashedPassword, 
                salt, 
                fullname: req.body.fullname 
            }).then(() => {
                return done(null)
            }).catch(() => {
                return done(null, false);  
            });
        });
    },
    localLogin: () => {
        return new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false,
            passReqToCallback: true
        }, (req, email, password, done) => {

            const user = {
                email: email.trim(),
                password: password.trim() 
            };

            User.findOne({ email: user.email }).then((savedUser) => {
                if (!savedUser) {
                    const error = new Error('Incorrect email or password');
                    error.name = 'IncorrectCredentialsError';

                    return done(error);
                }

                const isMatch = savedUser.hashedPassword === encryption.generateHashedPassword(savedUser.salt, password);

                if (!isMatch) {
                    const error = new Error('Incorrect email or password');
                    error.name = 'IncorrectCredentialsError';

                    return done(error);
                }

                const payload = {
                    sub: savedUser.id
                };

                const token = jwt.sign(payload, secret);
                const isAdmin = savedUser.roles.indexOf('Admin') != -1;

                const data = {
                    fullname: savedUser.fullname,
                    isAdmin
                };

                return done(null, token, data);
            });
        });
    }
};
