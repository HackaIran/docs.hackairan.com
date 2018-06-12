var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../model/User");
var Document = require('../model/Document');
var Category = require('../model/Category');


var userController = {};

// Restrict access to root page
userController.home = function(req, res) {

    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    let userDocuments = [];
    Document.find({isActive: true}).populate('author').populate('category').exec(function(err, result){
        console.log("res",result)
        for(let item of result){
            if(item.author.username == req.user.username){
                userDocuments.push(item)
            }
        }
        
        // otherwise it renders home view
        res.render('user/home', { user: req.user, url: 'home', title: 'Home', userDocs: userDocuments });
    });

    

};

// Post registration
userController.doRegister = function(req, res) {

    const data = {
        username : req.body.username,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        avatar: req.body.avatar || '',
        email: req.body.email
    }
    User.register(data, req.body.password, function(err, user) {
        if (err) {
            return res.render('user/register', { message: err });
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


    Category.find({isActive: true}, (err, result)=>{

        if(err){

            // otherwise it renders new presentation view
            res.render('user/createDocument', { user: req.user , error: err, categories: null});
        
        }else{

            // otherwise it renders new presentation view
            res.render('user/createDocument', { user: req.user , error: null, categories: result });
        
        }

    })
    

};

//create Document
userController.doCreateDocument = function(req, res){

    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    console.log(req.body)
    // create new document if logged in
    let newDocument = new Document(
        {
            uniqueUrl: req.body.url,
            name: req.body.name,
            author: mongoose.Types.ObjectId(req.user._id),
            category: mongoose.Types.ObjectId(req.body.category),
            summary: req.body.summary,
            text: req.body.content
        }
    );

    newDocument.save(function(err, result){
        if(err)
        {
            res.json({status: 201,text: err})
        }else{
            res.json({
                status: 200,
                text: ''
            });
        }

        
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