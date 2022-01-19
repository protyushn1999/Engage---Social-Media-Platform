const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const userDataBase = require('../models/user');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'engage'
}

passport.use(
    new JWTStrategy(opts, function(jwt_payload, done) {
    
        userDataBase.findById(jwt_payload._id, function(err, user) {
            if(err) {
                console.log("Error in finding the user from JWT", err);
                return ;
            }
            if(user) {
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        })

}));


module.exports = passport;



// JWT token has 3 parts ________.________.________
// First part is Header, Second part is Payload and Third part is Signature