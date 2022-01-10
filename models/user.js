const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
// const name of thing that will help to export it = mongoose.nodel('name of the model', name of the schema it follows);
const users = mongoose.model('user', userSchema);

module.exports = users;

