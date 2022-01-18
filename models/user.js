const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const avatar_path = path.join('/uploads/users/avatar');

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
    },
    currentResidence: {
        type: String
    },
    permanentResidence: {
        type: String
    },
    relationships: {
        type: String
    },
    hobbies: {
        type: String
    },
    bio: {
        type: String
    },
    avatar: {
        type: String
    }

}, {
    timestamps: true
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', avatar_path));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  })

// static functions OOP
//className.statics.functionName = 
// this attaches the disk storage on multer to "storage" key in multer

userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath = avatar_path;
// this ensures that the avatar_path defined in this file is accessible outside this file publically. Can be accessed by user.avatarPath (modelName.functionName)

// const name of thing that will help to export it = mongoose.nodel('name of the model', name of the schema it follows);
const users = mongoose.model('user', userSchema);

module.exports = users;

