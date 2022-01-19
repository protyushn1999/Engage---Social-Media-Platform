const express = require('express');
const router = express.Router();
const postAPI = require('../../../controllers/api/v1/posts_api');

router.get('/', postAPI.index);
router.get('/posts',postAPI.allposts);

module.exports = router;