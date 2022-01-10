const userDataBase = require('../models/user');
const postDataBase = require('../models/posts');

// render the sign up page
module.exports.signUp = function(req,res) {
  if(req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  
  return res.render('user_sign_up',{
        title: 'Socialley Sign Up'
    })
}

// render the sign in page
module.exports.signIn = function(req,res) {
  if(req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }  
  return res.render('user_sign_in',{
        title: 'Socialley Sign In'
    })
}

//get the sign up data and create a new contact
module.exports.create = function(req,res) {
    if(req.body.password != req.body.confirm_password) {
        return res.redirect('/');
    }

    userDataBase.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log('error in finding the user in signing up');  
            return res.redirect('/');
        }
        if(!user) {
            userDataBase.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            }, function(err,userDetails) {
                if(err) {
                    console.log('Error in creating a new user'); 
                    return res.redirect('/');
                }
                console.log('*********' , userDetails);
                return res.redirect('/users/signin');
            });
        }
        else {
            return res.redirect('/');
        }

    
    });
}
//get the log in data and create a new session for the user
module.exports.createSession = function(req,res) {
    return res.redirect('/users/profile');
}

// render the profile page
module.exports.profile = function(req,res) { 
    //return res.end("<h1>User Profile</h1>");
    return res.render('user_profile',{
        title: 'User Profile'
    })
}

// render the posts page

//  module.exports.posts = function(req,res) {
//     postDataBase.find({}, function(err,posts) {

//         if(err) { 
//             console.log('Error in finding the posts');
//             return;
//         }

//         return res.render('user_posts',{
//             title: 'User Posts',
//             posts: posts
//         })
//     })
// }

module.exports.posts = function(req,res) {
    postDataBase.find({})
    .populate('user')
    //populating the comments and the user of the comments
    .populate({
        path : 'comments',
        populate : {
            path: 'user'
        }
    })
    
    .exec(function(err,posts) {
        if(err) {
            console.log('error in fetching the posts');
            return;
        }
        return res.render('user_posts',{
            title: 'User Posts',
            posts: posts,
        })
    })
}


// logout the user and redirect to the sign in page
module.exports.destroySession = function(req,res) {
    req.logout();
    return res.redirect('/');
}

