// for creating and exporing action function(controller function) we use the syntax below:
// module.exports.actionName = function(req,res) {};

module.exports.home = function(req,res) {
    console.log(req.cookies);
    if(req.isAuthenticated()) {
        return res.redirect('/users/posts');
      }
    return res.render('home', {
        title: 'Home Page'
    });
};

  