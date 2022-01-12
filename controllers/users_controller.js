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
    return res.redirect('/users/posts');
}

// render the profile page
module.exports.profile = function(req,res) { 
    userDataBase.findById(req.params.id, function(err,user) {
        if(err) {
            console.log('error in finding the user');
            return;
        }
        postDataBase.find({user: req.params.id})
            .populate({
                path : 'comments',
                populate : {
                    path: 'user'
                }
            })
            .exec(function(err, posts_by_user) {
                if(err) {
                    console.log('error in fetching the posts');
                    return;
                }
                //console.log(posts_by_user);
                return res.render('user_profile',{
                title: 'User Profile',
                profile_user: user,
                posts: posts_by_user
                })

            })
                
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
        //find all the users from the user database to show on the friends list
         userDataBase.find({}, function(err, all_users) {
             if(err) {
                 console.log("Error in finding the users");
                 return;
             }
             //console.log(all_users);
             return res.render('user_posts',{
                title: 'User Posts',
                posts: posts,
                all_users: all_users
            })
         })    
    })
}

// update the user profile and redirects the user to the profile page
module.exports.updateprofile = function(req,res) {
    if(req.params.id == req.user.id) {
        userDataBase.findByIdAndUpdate(req.params.id,{name: req.body.name, email: req.body.email}, function(err,user) {
            if(err) {
                console.log('Error in updating the user profile');
                return;
            }
            return res.redirect('back');
        })
    }
}


// logout the user and redirect to the sign in page
module.exports.destroySession = function(req,res) {
    req.logout();
    return res.redirect('/');
}

