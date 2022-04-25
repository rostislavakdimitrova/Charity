const express = require('express');
const causeController = require('../controllers/cause');
const authCheck = require('../middlewares/auth');

const router = express.Router();


router.post('/create', authCheck.isAdmin, causeController.createNewCause);

router.get('/all', causeController.getAll);

router.get('/details/:id', authCheck.isAuth, causeController.getById);

router.put('/edit/:id', authCheck.isAdmin, causeController.updateById);

router.delete('/delete/:id', authCheck.isAdmin, causeController.deleteById);

router.get('/getLastThree', causeController.getLastThree);

router.post('/donate/:id', authCheck.isAuth, causeController.donate);


module.exports = router;