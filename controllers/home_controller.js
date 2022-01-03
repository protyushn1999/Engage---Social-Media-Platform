// for creating and exporing action function(controller function) we use the syntax below:
// module.exports.actionName = function(req,res) {};

module.exports.home = function(req,res) {
    //return res.end('<h1>Express is up for Socialley-X</h1>');
    return res.render('home', {
        title: 'Home Page'
    });
};