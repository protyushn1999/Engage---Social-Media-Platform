const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }, // content of the post
    // which user has commemted the following comment
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // this comment belongs to which post
    post :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'like'
        }
    ]
},{
    timestamps: true
})

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;
