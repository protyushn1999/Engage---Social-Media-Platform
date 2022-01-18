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
        if(req.xhr) {
            // it means populate all the fields of user except password
            postData = await postData.populate('user', '-password');  // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            //postData = await postData.populate('user','createdAt');
            console.log('********* from pc2' , postData);
            
            return res.status(200).json({
                data: {
                    post: postData
                },
                message: 'Post Created successfully - pc'
            });
        }
        
        req.flash('success', 'Post created successfully');
        return res.redirect('back');
        
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
                    comment = await comment.populate('user', '-password');
                    
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Comment created!"
                    });
                }
                req.flash('success', 'Comment created successfully');
                return res.redirect('/users/posts');
                
            }
    }catch(err) {
        req.flash('error', 'Comment cant be created');
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
            // delete all the comments associated with the post in the comment data base
            await commentDataBase.deleteMany({ post: req.params.id });

            if(req.xhr) { 
                    
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        },
                        message: 'Post Deleted Successfully'
                    });
            }
            req.flash('success', 'Post deleted successfully');
            return res.redirect("/users/posts");
        } 
        else {
            req.flash('error', 'Post cant be deleted');
            return res.redirect("/users/posts");
        }
  };
} catch (err) {
    console.log("Error", err);
    req.flash('error', err);
}



// module to delete a comment from the post == > delete it from comment schema as well as from the post schema
module.exports.deletecomment = async function(req,res) {
    try{
        let comment = await commentDataBase.findById(req.params.id);

        if(comment && comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();

            //delete the comment from the post data base. the comments are stored in an array in each post in the post data base
            let post = await postDataBase.findByIdAndUpdate(postId, {$pull : {comment: req.params.id}});

            if(req.xhr) {
                
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: 'Comment Deleted Successfully'
                })
            }
            req.flash('success', 'Comment deleted!');
            return res.redirect('/users/posts');
            
        }
        else {
            req.flash('error', 'Unauthorised');
            return res.redirect('/users/posts');
        }
    }catch(err){
        console.log('error',err);
        return;
    }
}