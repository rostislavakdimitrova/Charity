const express = require('express');
const authController = require('../controllers/auth');
const authCheck = require('../middlewares/auth');
const errorController = require('../controllers/error');

const router = express.Router();


router.post('/signup', authController.register);

router.post('/signin', authController.login);

router.get('/profile/:id', authCheck.isAuth, authController.getProfile);

router.all('*', errorController.error);

module.exports = router;


