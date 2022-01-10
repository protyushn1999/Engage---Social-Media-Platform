const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// import the user model
const userDataBase = require("../models/user");

//authentication strategy using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      //find a user int he database matching the credentials given by the user passed
      userDataBase.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("error in finding the user in signing in");
          return;
        }
        if (!user || user.password !== password) {
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//serialising the user to decide which key to store in the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialising the user from the key in the session
passport.deserializeUser(function (id, done) {
  userDataBase.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding the user in signing in");
      return done(err);
    }
    return done(null, user);
  });
});

//check if the user is authenticated
passport.checkAuthentication = function(req,res, next) {
    // If the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()) {
        return next();
    }

    // If user is not signed in
    return res.redirect('/');
}


passport.setAuthenticatedUser = function(req,res,next) {
    if(req.isAuthenticated()) {
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
