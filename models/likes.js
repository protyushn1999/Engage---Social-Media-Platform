const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.ObjectId
    },
    // likeableItem can be a post or a comment on
    // A user can either like a post or a comment , we have to do dynamic referencing here to find which item was liked or selected.

    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    onModel : {
        type: String,
        required: true,
        enum: ['post', 'comment'] // model names from which the likeableItem can be referenced
    } 
},{
    timestamps: true
});

const likes = mongoose.model('like', likeSchema);

module.exports = likes;