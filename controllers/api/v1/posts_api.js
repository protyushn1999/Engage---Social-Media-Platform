const postDataBase = require('../../../models/posts');

module.exports.index = function(req,res) {
    return res.status(200).json({
        message: 'Welcome to the API',
        posts:  []
    })
}
module.exports.allposts = async function(req,res) {
    try{
        let posts = await postDataBase.find({});
        return res.status(200).json({
        posts: posts,
        message: 'All posts from engage'
    })
    } catch(err){console.log(err)};
};