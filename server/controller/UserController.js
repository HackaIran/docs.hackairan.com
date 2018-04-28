var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../model/User");


var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
    
    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    // otherwise it renders home view
    res.render('user', { user: req.user, url: 'home', title: 'Home' });

};

// Post registration
userController.doRegister = function(req, res) {
    const data = {
        username : req.body.username,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        avatar: req.body.avatar || null,
        email: req.body.email
    }
    User.register(new User(data), req.body.password, function(err, user) {
        if (err) {
            return res.render('/register', { user: user, url: 'register', title: 'Register' });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/user');
        });
    });
};

// Post login
userController.doLogin = function(req, res) {
    passport.authenticate('local')(req, res, function () {
        res.redirect('/user');
    });
};

// logout
userController.logout = function(req, res) {
    req.logout();
    res.redirect('/login');
};

// create Document page
userController.createDocument = function(req, res) {
    
    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    // otherwise it renders new presentation view
    res.render('/createDocument', { user: req.user});

};

module.exports = userController;