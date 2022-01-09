const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts_controller');
const userController = require('../controllers/users_controller');

router.get('/', userController.posts)
router.post('/createpost' , postController.createPost);


module.exports = router;