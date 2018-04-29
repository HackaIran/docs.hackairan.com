var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../model/User");
var Document = require('../model/Document');


var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
    
    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    let userDocuments = [];
    Document.find({isActive: true}).populate('author').exec(function(err, res){
        for(let item of res){
            if(item.author.username == req.user.username){
                userDocuments.push(item)
            }
        }
        // otherwise it renders home view
        res.render('user/home', { user: req.user, url: 'home', title: 'Home', documents: userDocuments });
    });

    

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
    res.render('/user/createDocument', { user: req.user});

};

//create Document
userController.doCreateDocument = function(req, res){

    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    // create new document if logged in
    let newDocument = new Document(
        {
            uniqueUrl: req.body.uniqueUrl,
            name: req.body.name,
            author: mongoose.Types.ObjectId(req.user._id),
            category: mongoose.Types.ObjectId(req.body.categoryId),
            summary: req.body.summary,
            text: req.body.text
        }
    );

    newDocument.save(function(err, result){
        if(err){res.json({status: 500,text: err})}

        res.json({
            status: 200,
            text: ''
        });
    })

};

//renders edit Document page
userController.editDocument = function(req, res){
    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    Document.findOne({uniqueUrl: req.params.uniqueUrl}, function(err, res){
        
        if(err){ return res.render('error') }

        // otherwise it renders new presentation view
        res.render('/user/editDocument', { user: req.user, document: res});

    })
    
}

//edits document
userController.doEditDocument = function(req, res){
    
    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    Document.findOneAndUpdate({uniqueUrl: req.uniqueUrl},
        {
            uniqueUrl: req.body.uniqueUrl,
            name: req.body.name,
            summary: req.body.summary,
            text: req.body.text,
            modifiedAt: Date.now()
        }
    ,function(err, doc, res){
        if(!err){
            res.json({
                status: 200,
            });
        }else{
            res.json({
                status: 500,
            });
        }
    });

    
}

//delete document
userController.deleteDocument = function(req, res){

    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    Document.findOneAndUpdate({uniqueUrl: req.body.uniqueUrl},{isActive: false},function(err, doc, result){
        if(err){
            res.json({
                status: 500
            })
        }else{
            res.json({
                status: 200
            })
        }
    })
}

module.exports = userController;