const mongoose = require('monggose');

const friendshipSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status:{
        type: String,
        default: 'pending'  // it can be pending, accepted, rejected
    }
},{
    timestamps: true
});


const friendship = mongoose.model('friendship', friendshipSchema);
module.exports = friendship;



// #1. user A creates a friendship request
// #2. user B accepts the request
// #3. user A and user B are friends
// #4. user A and user B can see each other's posts

// user A sends friend request to user B BY CLICKING on the friend btn on the user B profile page
// case that can arrise:
// (cases where friend request cant be sent)
// user A is already a friend with user B  ==> status: accepted ==> Add friend btn is disabled
// user A has already send a friend request to user B ==> status: pending ==> Add friend btn shows request pending
// user A has already received a friend request from user B ==> status: pending ==> Add friend btn shows disabled
// user A has been blocked by user B ==> status: rejected/blocked ==> Add friend btn is disabled

// (cases where friend request can be sent)
// user A is not a friend with user B ==?> status: pending

// now user B can accept the friend request by clicking on the accept btn on the user A profile page
// case that can arise