const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');
const usersController = require('../controllers/users_controller');

router.get('/',passport.checkAuthentication, usersController.posts)
router.post('/createpost' ,passport.checkAuthentication, postsController.createPost);
router.post('/createcomment',passport.checkAuthentication , postsController.createcomment);

module.exports = router;