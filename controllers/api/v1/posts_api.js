const postDataBase = require('../../../models/posts');
const commentDataBase = require('../../../models/comments');

module.exports.index = function(req,res) {
    return res.status(200).json({
        message: 'Welcome to the API',
        posts:  []
    })
}
module.exports.allposts = async function(req,res) {
    try{
        let posts = await postDataBase.find({})
        .sort('-createdAt')
        .populate('user','-password')
        //populating the comments and the user of the comments
        .populate({
            path : 'comments',
            populate : {
                path: 'user'
            }
        });

        return res.status(200).json({
        posts: posts,
        message: 'All posts from engage'
    })
    } catch(err){console.log(err)};
};

//delete a post using API call
try {
    module.exports.deletepost = async function (req, res) {
        let post = await postDataBase.findById(req.params.id);

            if (post && post.user == req.user.id) {
                post.remove(); 
                // delete all the comments associated with the post in the comment data base
                await commentDataBase.deleteMany({ post: req.params.id });
                return res.status(200).json({
                    message: 'Post and associated comments deleted Successfully'
                });
             } 
        else {
            return res.status(401).json({
                message: 'You are not authorized to delete this post'
            })
        }
  };
} catch (err) {
    console.log("Error", err);
    return res.status(500).json({
        message: "Internal Server Error"
    });
   
}