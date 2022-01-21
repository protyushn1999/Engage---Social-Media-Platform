const userDataBase = require('../models/user');
const postDataBase = require('../models/posts');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

// render the sign up page
module.exports.signUp = function(req,res) {
  if(req.isAuthenticated()) {
    return res.redirect('/users/posts');
  }
  
  return res.render('user_sign_up',{
        title: 'Engage Sign Up Page'
    })
}

// render the sign in page
module.exports.signIn = function(req,res) {
  if(req.isAuthenticated()) {
    return res.redirect('/users/posts');
  }  
  return res.render('user_sign_in',{
        title: 'Engage Sign In Page'
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
    // req is a object and we are setting the flash property in it.. which include types such as success failure etc..
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/users/posts');
}

// render the profile page
module.exports.profile = async function(req,res) { 
    
    try{ 
        let user = await userDataBase.findById(req.params.id);

        let posts_by_user = await postDataBase.find({user: req.params.id})
                            .populate({
                                path : 'comments',
                                    populate : {
                                        path: 'user'
                                    } // populate the user of the comment
                            })
                            .exec();
                //console.log(posts_by_user);
                
    return res.render('user_profile',{
                title: 'User Profile',
                profile_user: user,
                posts: posts_by_user
            }   
    );
    } catch(err) {
        console.log('Error', err);
        return;
    }
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

// module.exports.posts = function(req,res) {
//     postDataBase.find({})
//     .populate('user')
//     //populating the comments and the user of the comments
//     .populate({
//         path : 'comments',
//         populate : {
//             path: 'user'
//         }
//     })
    
//     .exec(function(err,posts) {
//         if(err) {
//             console.log('error in fetching the posts');
//             return;
//         }
//         //find all the users from the user database to show on the friends list
//          userDataBase.find({}, function(err, all_users) {
//              if(err) {
//                  console.log("Error in finding the users");
//                  return;
//              }
//              //console.log(all_users);
//              return res.render('user_posts',{
//                 title: 'User Posts',
//                 posts: posts,
//                 all_users: all_users
//             })
//          })    
//     })
// }

//render the posts page using async await function
try{
    module.exports.posts = async function(req,res) { 
    
        let posts = await postDataBase.find({})
        .sort('-createdAt')
        .populate('user')
        //populating the comments and the user of the comments
        .populate('comments')
        .populate({
            path: 'comments',
            populate: [
                {
                    path: 'user'
                },
                {
                    path: 'likes'
                }
            ]
            // populate: {
            //     path: 'user'
            // },
            // populate: {
            //     path: 'likes'
            // } // how to populate the likes of the comments along with the user
        })
        .populate('likes');

        // find all the users except the logged in user from the user database to show on the friends list
        let all_users = await userDataBase.find({_id: { $ne: req.user._id }});
        //const users = User.find({ _id: { $ne: user._id } })
        //UsersModel.find({ email: { $ne: 'testemail@email.com' } })
    
        return res.render('user_posts',{
            title: 'User Posts',
            posts: posts,
            all_users: all_users
        })
    
    }
}catch(err) {
    console.log('Error', err);
    return;
}


// update the user profile image and redirects him to the profile page
module.exports.updateprofileimage = async function(req, res) {
    try{
        if(req.user.id == req.params.id) {
            let user = await userDataBase.findById(req.params.id);
            userDataBase.uploadedAvatar(req,res,function(err) {
                if(err) {
                    console.log("Error in multer", err);
                    return;
                }
                // console.log(req);
                // console.log('******* req.user', req.user);
                if(req.file) {
                    
                    if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))) {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    
                    user.avatar = userDataBase.avatarPath + '/' + req.file.filename;

                }
                user.save();
                console.log("********* req.file", req.file);
                req.flash('success', 'Profile Picture Updated');
                return res.redirect('back');
            })
            
        }
        else {
            console.log('You are not authorized to update the profile image');
            req.flash('error','Not authorized to update the profile image!');
            return res.redirect('back');
            
        }

    }catch(err) {
        console.log('Error', err);
        return;
    }
}


// update the user profile and redirects the user to the profile page
module.exports.updateprofile = async function(req,res) {
    
    try{
        if(req.params.id == req.user.id) {
                let user = await userDataBase.findByIdAndUpdate(req.params.id,{name: req.body.name, email: req.body.email});
                user.save();
                console.log(user);
                req.flash('success', 'User Picture Updated!');
                return res.redirect('back');
        }
        else{
                console.log('You are not authorized to update the profile');
                req.flash('error','Not authorized to update the profile!');
                return res.redirect('back');
        }
        
    }catch(err) {
        console.log('Error', err);
        return;
    }
}
//update the user bio and other details and redirects the user to the same profile page again
module.exports.updatebio = async function(req,res) {
    try{
        if(req.params.id == req.user.id) {
            let user = await userDataBase.findByIdAndUpdate(req.params.id,{bio: req.body.bio, currentResidence: req.body.cur_res,  
                permanentResidence: req.body.per_res, 
                relationships: req.body.rel_stat,
                 hobbies: req.body.hobbies});
    
                console.log(user);
                req.flash('success', 'User Bio Updated!');
                return res.redirect('back');
        }
    } catch(err) {
        console.log('Error', err);
        return;
    }
    
}


// logout the user and redirect to the sign in page
module.exports.destroySession = function(req,res) {
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}

