const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socialley-development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
    console.log('Connected to the database :: Mongo DB');
});

module.exports = db;

// //require the library for mongoose
// const mongoose = require('mongoose');
// // connect to the database server
// mongoose.connect('mongodb://localhost/socialley-development');
// //acquire the connection to the database
// const db = mongoose.connection;
// //check for errors
// db.on('error', console.error.bind(console, 'connection error:'));
// //check for success
// db.once('open', function(){
//     console.log('Connected to MongoDB');
// });