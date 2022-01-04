const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.static('./assets'));

//using the express layouts for the layout
app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting the routes ==>  it means that all the '/' webpage will be redirect to ./routes folder
app.use('/', require('./routes'));

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//setting up the server
app.listen(port, function(err) {
    if(err) {
        console.log(`Error in setting up the server: ${err}`);
    }

    console.log(`Server is listening on port ${port}`);
});