const likeDataBase = require('../models/likes');
const postDataBase = require('../models/posts');
const commentDataBase = require('../models/comments');

//finding if the likeableItem is a post or a comment and checking if it is liked or not
//posts/likes/?id=abcde&type=post
module.exports.toggleLike = async function(req, res) {
    
    try{
        let deleted = false;
    let likeable;
    
        if(req.query.type == 'post') {
            let post = await postDataBase.findById(req.query.id).populate('likes');
                
                likeable = post;
                if(post.likes.length > 0) {
                    post.likes.forEach(function(like) {
                        if(like.user.toString() == req.user._id.toString()) {
                            like.remove();
                            post.likes.splice(post.likes.indexOf(like), 1);
                            post.save();
                            deleted = true;
                        }
                    });
                }
                if(!deleted) {
                    let like = await likeDataBase.create({
                        user : req.user._id,
                        likeable : likeable._id,
                        onModel : 'post'
                    });
                    post.likes.push(like._id);
                    console.log(post.likes);
                    post.save();
                }
                
                if(req.xhr) {
                    
                    return res.status(200).json({
                        message: "likes in post toggled successfully",
                        data: {
                            deleted: post.likes.length
                        }
                    })

                }


                
                
            
        }
        else {
            let comment = commentDataBase.findById(req.query.id).populate('likes');
                
                likeable = comment;
                if(comment.likes.length > 0) {
                    comment.likes.forEach(function(like) {
                        if(like.user.toString() == req.user._id.toString()) {
                            like.remove();
                            comment.likes.splice(comment.likes.indexOf(like), 1);
                            comment.save();
                            deleted = true;
                        }
                    });
                }
                if(!deleted) {
                    let like = await likeDataBase({
                        user : req.user._id,
                        likeable : likeable._id,
                        onModel : 'comment'
                    });
                    comment.likes.push(like._id);
                    comment.save();
                }
                
                if(req.xhr) {
                    
                    return res.status(200).json({
                        message: "likes in comment toggled successfully",
                        data: {
                            deleted: comment.likes.length
                        }
                    })

                }

            
            
        }
    } catch(err) {
        console.log('Error', err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
    
    
}


// module.exports.toggleLike = async function(req, res) {
//    try{
//        let deleted = false;
//        // First we have to find what is the type of likeable (post or comment).
//        // Then we need to check if the particular likeable is liked or not and further do the changes.
//        let likeable;

//        if(req.query.type == 'post') {
//            likeable = await postDataBase.findById(req.query.id).populate('likes');
//        }
//        else {
//            likeable = await commentDataBase.findById(req.query.id).populate('likes');
//         }
//         // check if a like already exists or not
//        let existingLike = await likeDataBase.findOne({
//            user: req.user._id,
//            likeable: req.query.id,
//            onModel: req.query.type
//        })
//        // if existing like is found then delete it
//        if(existingLike) {
//             likeable.likes.pull(existingLike._id);
//             likeable.save();

//             existingLike.remove();
//             deleted = true;
//        }
//        // if no like is found then create a new like
//        else {
//             let newLike = await likeDataBase.create({
//                 user: req.user._id,
//                 likeable: req.query.id,
//                 onModel: req.query.type
//             });

//             likeable.likes.push(newLike._id);
//             likeable.save();
//        }

//        if(req.xhr){
//             return res.status(200).json({
//                 message: "Like toggled successfully",
//                 data: {
//                     deleted: deleted
//                 }
//             })
//         }
       

//    } catch(err) {
//        console.log('Error', err);
//        return res.status(500).json({
//            message: 'Internal Server Error'
//        });
//    }
// }

