const express = require('express');

const router = express.Router();
const likesController = require('../controllers/likes_controller');

router.post('/toggle', likesController.toggleLike);


module.exports = router;


//finding if the likeableItem is a post or a comment and checking if it is liked or not
//osts/likes/?id=abcde&type=post
// module.exports.toggleLike = async function(req, res) {
    
//     try{
//         let deleted = false;
//     let likeable;
    
//         if(req.query.type == 'post') {
//             let post = await postDataBase.findById(req.query.id).populate('likes');
                
//                 likeable = post;
//                 if(post.likes.length > 0) {
//                     post.likes.forEach(function(like) {
//                         if(like.user.toString() == req.user._id.toString()) {
//                             like.remove();
//                             post.likes.splice(post.likes.indexOf(like), 1);
//                             post.save();
//                             deleted = true;
//                         }
//                     });
//                 }
//                 if(!deleted) {
//                     let like = await likeDataBase.create({
//                         user : req.user._id,
//                         likeable : likeable._id,
//                         onModel : 'post'
//                     });
//                     post.likes.push(like._id);
//                     post.save();
//                 }
                
//                 if(req.xhr) {
                    
//                     return res.status(200).json({
//                         message: "likes in post toggled successfully",
//                         data: {
//                             deleted: deleted
//                         }
//                     })

//                 }


                
                
            
//         }
//         else {
//             let comment = commentDataBase.findById(req.query.id).populate('likes');
                
//                 likeable = comment;
//                 if(comment.likes.length > 0) {
//                     comment.likes.forEach(function(like) {
//                         if(like.user.toString() == req.user._id.toString()) {
//                             like.remove();
//                             comment.likes.splice(comment.likes.indexOf(like), 1);
//                             comment.save();
//                             deleted = true;
//                         }
//                     });
//                 }
//                 if(!deleted) {
//                     let like = await likeDataBase({
//                         user : req.user._id,
//                         likeable : likeable._id,
//                         onModel : 'comment'
//                     });
//                     comment.likes.push(like._id);
//                     comment.save();
//                 }
                
//                 if(req.xhr) {
                    
//                     return res.status(200).json({
//                         message: "likes in comment toggled successfully",
//                         data: {
//                             deleted: deleted
//                         }
//                     })

//                 }

            
            
//         }
//     } catch(err) {
//         console.log('Error', err);
//         return res.status(500).json({
//             message: "Internal Server Error"
//         })
//     }
    
    
// }