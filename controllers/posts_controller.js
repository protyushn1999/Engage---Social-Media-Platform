const postDataBase = require('../models/posts');
const commentDataBase = require('../models/comments');

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

module.exports.createcomment = function(req,res) { 
    postDataBase.findById(req.body.postId, function(err,post) {
        if(err) {
            console.log('Error in finding the post');
            return res.redirect('/users/posts');
        }

        if(post) {
            commentDataBase.create({
                content: req.body.content,
                post: req.body.postId,
                user: req.user._id
            }, function(err,comment) {
                if(err) {
                    console.log('Error in creating the comment');
                    return res.redirect('/users/posts');
                }

                post.comments.push(comment);
                post.save();

                return res.redirect('/users/posts');
            })
        }
    })
}

//module to delete a post from the database
module.exports.deletepost = function(req,res) {
    postDataBase.findById(req.params.id, function(err,post) {
        if(err) {
            console.log('Error in finding the post');
            return res.redirect('/users/posts');
        }

        if(post && post.user == req.user.id) {
            post.remove();

            commentDataBase.deleteMany({post: req.params.id}, function(err) {
                if(err) {
                    console.log('Error in deleting the comments');
                    return res.redirect('/users/posts');
                }

                return res.redirect('/users/posts');
            })
        }
    })
}

//module to delete a comment from the post == > delete it from comment schema as well as from the post schema ==
module.exports.deletecomment = function(req,res) {
    commentDataBase.findById(req.params.id, function(err,comment) {
        if(err) {
            console.log('Error in finding the comment');
            return res.redirect('/users/posts');
        }
        if(comment && comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            postDataBase.findByIdAndUpdate(postId,{$pull : {comment: req.params.id}}, function(err,post) {
                return res.redirect('/users/posts');
            })
        }
    })
}