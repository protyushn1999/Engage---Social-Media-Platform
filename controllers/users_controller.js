const userDataBase = require('../models/user');

// render the sign up page
module.exports.signUp = function(req,res) {
    return res.render('user_sign_up',{
        title: 'Socialley Sign Up'
    })
}

// render the sign in page
module.exports.signIn = function(req,res) {
    return res.render('user_sign_in',{
        title: 'Socialley Sign In'
    })
}

//get the sign up data and create a new contact
module.exports.create = function(req,res) {
    if(req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    userDataBase.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log('error in finding the user in signing up');  return;
        }
        if(!user) {
            userDataBase.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            }, function(err,userDetails) {
                if(err) {
                    console.log('Error in creating a new user'); return;
                }
                console.log('*********' , userDetails);
                return res.redirect('/users/signin');
            });
        }
        else {
            return res.redirect('back');
        }

    
    });
}
//get the log in data and create a new session for the user
module.exports.createSession = function(req,res) {
    //todo later
}

// render the profile page
module.exports.profile = function(req,res) { 
    //return res.end("<h1>User Profile</h1>");
    return res.render('user_profile',{
        title: 'User Profile'
    })
}

// render the posts page
module.exports.posts = function(req,res) {
    return res.end('<h1>User Posts</h1>');
}