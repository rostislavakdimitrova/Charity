const express = require('express');
const eventController = require('../controllers/event');
const authCheck = require('../middlewares/auth');

const router = express.Router();


router.post('/create', authCheck.isAdmin, eventController.createNewEvent);

router.get('/all', eventController.getAll);

router.get('/details/:id', authCheck.isAuth, eventController.getById);

router.put('/edit/:id', authCheck.isAdmin, eventController.updateById);

router.delete('/delete/:id', authCheck.isAdmin, eventController.deleteById);

router.get('/getLastThree', eventController.getLastThree);

router.post('/volounteer/:id', authCheck.isAuth, eventController.volounteer);


module.exports = router;