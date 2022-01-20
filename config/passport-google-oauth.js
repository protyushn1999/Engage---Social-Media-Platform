const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const userDataBase =require('../models/user');


passport.use(new GoogleStrategy({
    clientID: "408804846362-i1jvggdr60msku3rq69h40dtt12mstfa.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    userDataBase.findOne({email: profile.emails[0].value}, function(err, user){
        if(err) {
            console.log('Error in google strategy passport', err);
            return;
        }
        console.log(profile);
        if(user) {
            return done(null, user);
        }
        else {
            userDataBase.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),
                avatar: profile.photos[0].value
            }, function(err, user) {
                if(err) {
                    console.log('error in creating user google strategy-passport', err);
                    return;
                }
                return done(null, user);
            })
        }
    })
  }
));

module.exports = passport;


// Google OAuth Client ID and Client Secret

//  Client ID - 408804846362-i1jvggdr60msku3rq69h40dtt12mstfa.apps.googleusercontent.com
//  Client Secret - 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