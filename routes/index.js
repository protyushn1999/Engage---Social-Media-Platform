const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controllers/home_controller');
console.log('Router Connected');

router.get('/', homeController.home);
//setting the routes ==>  it means that all the '/users' webpage will be redirect to ./users folder
router.use('/users', require('./users'));


module.exports = router;