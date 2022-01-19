const express = require('express');
const router = express.Router();
const passport = require('passport');
const postAPI = require('../../../controllers/api/v1/posts_api');



router.get('/',postAPI.allposts);
router.delete('/delete/:id',passport.authenticate('jwt', {session : false}), postAPI.deletepost);

module.exports = router;