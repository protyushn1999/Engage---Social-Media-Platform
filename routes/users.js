const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');


router.get('/signup' , usersController.signUp);
router.get('/signin' , usersController.signIn);

// User cant see the profile without being logged in , hence we use checkAuthentication middleware
router.get('/profile' ,passport.checkAuthentication, usersController.profile);
router.get('/posts' , usersController.posts);
router.post('/create' , usersController.create);

//use passport as a middleware to handle the local strategy

router.post('/create-session', passport.authenticate(
        //use local strategy
        'local',
        {failureRedirect: '/users/signin'}
) , usersController.createSession);



module.exports = router;