const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socialley-development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
    console.log('Connected to the database :: Mongo DB');
});

module.exports = db;
