const mongoose=  require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // includes the comment id associated with the post that will make it easier to display the comments
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
}, {
    timestamps: true
});

const posts = mongoose.model('post', postSchema);
module.exports = posts;