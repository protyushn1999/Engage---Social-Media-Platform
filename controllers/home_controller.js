// for creating and exporing action function(controller function) we use the syntax below:
// module.exports.actionName = function(req,res) {};

module.exports.home = function(req,res) {
    //return res.end('<h1>Express is up for Socialley-X</h1>');
    console.log(req.cookies);
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
      }
    return res.render('home', {
        title: 'Home Page'
    });
};

  