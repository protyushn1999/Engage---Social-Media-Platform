const postDataBase = require('../models/posts');
const commentDataBase = require('../models/comments');
const userDataBase = require('../models/user');

// creating a post
try{
    module.exports.createPost = async function(req,res) {
        let postData = await postDataBase.create({
            content: req.body.feed_post,
            user: req.user._id
        });
        let postByUserDetails = await userDataBase.findById(req.user._id);

        console.log('*********' , postData);
        console.log('*********' , postByUserDetails);

        req.flash('success', 'Post created successfully');
        //return res.redirect('/users/posts');

        if(req.xhr) {
            
            return res.status(200).json({
                data: {
                    post: postData,
                    userId: postByUserDetails
                },
                message: 'Post Created successfully - pc'
            });
        }
        
    }
}catch(err){
    req.flash('error', 'Post cant be created');
    console.log('Error',err);
}

// creating a comment on the post
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
                req.flash('success', 'Comment Posted');
                return res.redirect('/users/posts');
            })
        }
    })
}

// module to delete a post from the database
try {
  module.exports.deletepost = async function (req, res) {
    let post = await postDataBase.findById(req.params.id);

    if (post && post.user == req.user.id) {
      post.remove();

    if(req.xhr) { 

        return res.status(200).json({
            data: {
                post_id: req.params.id
            },
            message: 'Post Deleted Successfully'
        });
    }
        
      // delete all the comments associated with the post in the comment data base
      await commentDataBase.deleteMany({ post: req.params.id });
      req.flash('success', 'Post and associated comments deleted');
      return res.redirect("/users/posts");
    } else {
        req.flash('error', 'Post cant be deleted');
        return res.redirect("/users/posts");
    }
  };
} catch (err) {
  console.log("Error", err);
  req.flash('error', err);
}



// module to delete a comment from the post == > delete it from comment schema as well as from the post schema
module.exports.deletecomment = function(req,res) {
    commentDataBase.findById(req.params.id, function(err,comment) {
        if(err) {
            console.log('Error in finding the comment');
            return res.redirect('/users/posts');
        }
        if(comment && comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();

            //delete the comment from the post data base. the comments are stored in an array in each post in the post data base
            postDataBase.findByIdAndUpdate(postId,{$pull : {comment: req.params.id}}, function(err,post) {
                return res.redirect('/users/posts');
            })
        }
    })
}