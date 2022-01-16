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
        //console.log('post id is', postData._id);
        //let postByUserDetails = await userDataBase.findById(req.user._id).populate('name');
        //let postUser = await postDataBase.findById(postData._id).populate('user');
        //console.log(postUser);

        console.log('********* from pc' , postData);
        //console.log('********* from pc1' , postByUserDetails);

        req.flash('success', 'Post created successfully');
        //return res.redirect('/users/posts');

        if(req.xhr) {
            
            postData = await postData.populate('user', 'name');
            //postData = await postData.populate('user','createdAt');
            console.log('********* from pc2' , postData);
            return res.status(200).json({
                data: {
                    post: postData
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
module.exports.createcomment = async function(req,res) { 
    
    try{
            let post = await postDataBase.findById(req.body.postId);
            if(post) {
                let comment =  await commentDataBase.create({
                content: req.body.content,
                post: req.body.postId,
                user: req.user._id
                });

                post.comments.push(comment);
                post.save();
                

                if (req.xhr){
                    // Similar for comments to fetch the user's id!
                    comment = await comment.populate('user', 'name');

                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Comment created!"
                    });
                }

                req.flash('success', 'Comment Posted');

                return res.redirect('/users/posts');
                
            }
    }catch(err) {
        console.log('Error in creating the comment', err);
        return;
    }
        
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