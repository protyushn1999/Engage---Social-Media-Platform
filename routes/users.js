const express = require('express');
const router = express.Router();
const passport = require('passport');
const { route } = require('.');

const usersController = require('../controllers/users_controller');


router.get('/signup' , usersController.signUp);
router.get('/signin' , usersController.signIn);

// router.get('/profile/:id' ,passport.checkAuthentication, usersController.profile);

//router.get('/posts' , usersController.posts);
router.post('/create' , usersController.create);
//use passport as a middleware to handle the local strategy
router.post('/create-session', passport.authenticate(
        //use local strategy
        'local',
        {failureRedirect: '/users/signin'}
) , usersController.createSession);

router.get('/signout',usersController.destroySession);

// setting the routes ==> it means that all the '/posts' webpage will be redirect to ./posts folder
router.use('/posts', require('./posts'));

// profile routes are handled here
router.get('/profile/:id' ,passport.checkAuthentication, usersController.profile);
router.post('/profile/updateprofile/:id', passport.checkAuthentication, usersController.updateprofile);
router.post('/profile/updatebio/:id', passport.checkAuthentication, usersController.updatebio);
router.post('/profile/updateprofileimage/:id', passport.checkAuthentication, usersController.updateprofileimage);

module.exports = router;