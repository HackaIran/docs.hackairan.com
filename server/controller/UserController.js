// var mongoose = require("mongoose");
// var passport = require("passport");
// var User = require("../model/User");


// var userController = {};

// // Restrict access to root page
// userController.home = function(req, res) {
    
//     // redirects to /login if user hasn't logged in yet
//     if (!req.isAuthenticated()) return res.redirect('/login');

//     // otherwise it renders home view
//     res.render('users/home', { user: req.user, url: 'home', title: 'Home' });

// };

// // Post registration
// userController.doRegister = function(req, res) {
//     const data = {
//         username : req.body.username,
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email
//     }
//     User.register(new User(data), req.body.password, function(err, user) {
//         if (err) {
//             return res.render('users/register', { user: user, url: 'register', title: 'Register' });
//         }

//         passport.authenticate('local')(req, res, function () {
//             res.redirect('/home');
//         });
//     });
// };

// // Post login
// userController.doLogin = function(req, res) {
//     passport.authenticate('local')(req, res, function () {
//         res.redirect(req.body.redirect || '/home');
//     });
// };

// // logout
// userController.logout = function(req, res) {
//     req.logout();
//     res.redirect('/login');
// };

// // presentations page
// userController.presentations = function(req, res) {
    
//     // redirects to /login if user hasn't logged in yet
//     if (!req.isAuthenticated()) return res.redirect('/login?redirect=/presentations');

//     // otherwise it renders presentations view
//     Presentation.find({ author: req.user._id }).exec((err, presentations) => {

//         res.render('users/presentations/list', { user : req.user, presentations: presentations, url: 'presentations', title: 'Presentations' });

//     })

// };

// // create presentation page
// userController.createPresentation = function(req, res) {
    
//     // redirects to /login if user hasn't logged in yet
//     if (!req.isAuthenticated()) return res.redirect('/login?redirect=/presentations/new');

//     // otherwise it renders new presentation view
//     res.render('users/presentations/new', { user: req.user, url: 'presentations/new', title: 'New Presentation' });

// };

// module.exports = userController;