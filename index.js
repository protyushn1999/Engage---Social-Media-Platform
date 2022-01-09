const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 7000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const MongoStore = require('connect-mongo');
//const sass = require('node-sass');


//use sass to compile scss to css
// sass.render({
//     file: './assets/scss/style.scss',
//     outFile: './assets/css/style.css'
// }, function(err, result) {
//     if (err) {
//         console.log(err);
//     }
// });


//setting the middlewares
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

//using the express layouts for the layout
app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
 
//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//using the express session to encode and decode the session
app.use(session({
    name: 'Socialley',
    secret: 'my secret string',
    saveUninitialized: false,
    resave: false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store: MongoStore.create(
        { 
        mongoUrl: 'mongodb://localhost/socialley-development' ,
        autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

// initialize passport and session middleware

//passport.initialize() is used to initialize the passport middleware
app.use(passport.initialize());
//passport.session() is used to initialize the session
app.use(passport.session());
//passport.setAuthenticatedUser() is used to set the user in the session and store it in the locals
app.use(passport.setAuthenticatedUser);

//setting the routes ==>  it means that all the '/' webpage will be redirect to ./routes folder
app.use('/', require('./routes'));


//setting up the server
app.listen(port, function(err) {
    if(err) {
        console.log(`Error in setting up the server: ${err}`);
    }

    console.log(`Server is listening on port ${port}`);
});