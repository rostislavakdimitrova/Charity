const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = '1l0v3w1n3';

exports.isAuth = (req, res, next) => {
  
  if (!req.headers.authorization) {
	  return res.status(401).end();
  }

  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, secret, (err, decoded) => {
    
    if (err) {
       return res.status(401).end() 
    }

    const userId = decoded.sub;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(401).end();
        }

        req.user = user;

        return next();
      });
    });
};


exports.isAdmin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).end() 
      }
      const userId = decoded.sub;

      User.findById(userId).then((user) => {
        let adminRole = user.roles.indexOf('Admin') !== -1;

        if (adminRole) {
          console.log(user);
          next();
        } else {
          return res.status(401).json({
            message: 'You must be an admin to access this page'
          });
        }
      });
    });
  }
};



