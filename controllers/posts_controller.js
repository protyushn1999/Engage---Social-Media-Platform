const postDataBase = require('../models/posts');


module.exports.createPost = function(req,res) {
    postDataBase.create({
        content: req.body.feed_post,
        user: req.user._id
    },function(err,postData) {
        if(err) { 
            console.log('Error in creating a new post'); 
            return res.redirect('/users/posts');
        }
        console.log('*********' , postData);
        return res.redirect('/users/posts');
    })
}


