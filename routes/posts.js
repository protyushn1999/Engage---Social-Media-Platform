const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');
const usersController = require('../controllers/users_controller');
const likeController = require('../controllers/likes_controller');

router.get('/',passport.checkAuthentication, usersController.posts)
router.post('/createpost' ,passport.checkAuthentication, postsController.createPost);
router.post('/createcomment',passport.checkAuthentication , postsController.createcomment);
router.get('/deletepost/:id', passport.checkAuthentication, postsController.deletepost);
router.get('/deletecomment/:id', passport.checkAuthentication, postsController.deletecomment);

router.get('/likes', likeController.toggleLike);

module.exports = router;