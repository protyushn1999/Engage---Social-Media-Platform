const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts_controller');
const usersController = require('../controllers/users_controller');

router.get('/', usersController.posts)
router.post('/createpost' , postsController.createPost);


module.exports = router;