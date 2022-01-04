const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

//using the express layouts for the layout
app.use(expressLayouts);

app.use('/', require('./routes'));

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in setting up the server: ${err}`);
    }

    console.log(`Server is listening on port ${port}`);
});