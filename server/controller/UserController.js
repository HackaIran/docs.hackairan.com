var mongoose = require("mongoose");

var passport = require("passport");
var User = require("../model/User");
var Document = require('../model/Document');
var Category = require('../model/Category');
var DocumentArchive = require('../model/DocumentArchive');
const extractTags = require('../helper/extractor');


var userController = {};

// Restrict access to root page
userController.home = function(req, res) {

    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    let userDocuments = [];
    Document.find({isActive: true}).populate('author').populate('category').exec(function(err, result){
        for(let item of result){
            if(item.author.username == req.user.username){
                if(item.summary.length > 110){
                    item.summary = item.summary.slice(0,110)+" ...";
                }
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
userController.doCreateDocument = async function(req, res){

    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    let contentTags = extractTags(req.body.text);

    let isDuplicate = await  Document.findOne({uniqueUrl: req.body.uniqueUrl})

    if(isDuplicate){

        res.json({status: 201, text: {
            errors:{uniqueUrl:{message:`Unique Path ${req.body.uniqueUrl} is already defined by someone.`} }
        }})
        
        return;

    }

    

    // create new document if logged in
    let newDocument = new Document(
        {
            uniqueUrl: req.body.uniqueUrl,
            name: req.body.name,
            author: mongoose.Types.ObjectId(req.user._id),
            category: mongoose.Types.ObjectId(req.body.category),
            summary: req.body.summary,
            text: req.body.text,
            tags: contentTags
        }
    );

    newDocument.save(function(err, result){
        if(err)
        {
            res.json({status: 201, text: err})
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

    Document.findOne({uniqueUrl: req.params.uniqueUrl}, function(err, result){
        
        if(err){ return res.render('error') }

        // otherwise it renders new presentation view
        res.render('user/editDocument', { user: req.user, document: result});

    })
    
}

//edits document
userController.doEditDocument = function(req, res){
    
    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    let contentTags = extractTags(req.body.text);

    Document.findOneAndUpdate({uniqueUrl: req.body.uniqueUrl},
        {
            name: req.body.name,
            summary: req.body.summary,
            text: req.body.text,
            modifiedAt: Date.now(),
            tags: contentTags
        }
    ,{ runValidators: true }
    ,function(err, doc){
        if(!err){
            res.json({
                status: 200,
            });
        }else{
            res.json({
                status: 500,
                text: err
            });
        }
    });

    
}

//delete document
userController.deleteDocument = function(req, res){

    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    Document.findOne({uniqueUrl: req.body.uniqueUrl},function(err, document){
        if(err){
            res.json({
                status: 500
            })
        }else{
            let duplicateDoc = JSON.parse(JSON.stringify(document))
            duplicateDoc._id = mongoose.Types.ObjectId();
            var newDocumentArchive = new DocumentArchive(duplicateDoc);
            newDocumentArchive.save(function(err, result){
                if(err)
                {
                    res.json({status: 501})
                }else{
                    Document.deleteOne({uniqueUrl: req.body.uniqueUrl},function(err){
                        if(!err){
                            res.json({
                                status: 200
                            })    
                        }else{
                            res.json({
                                status: 502
                            })
                        }
                        
                    })
                    
                }
            })            
        }
    })
}

//categories page
userController.categories = function(req, res){
    
    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');



    Category.find({isActive: true},async function(err, result){
        
        let categories = [];
        for(let item of result){
            let categoryItems = await  Document.find({category: mongoose.Types.ObjectId(item._id)})
                .sort({modifiedAt: -1}).limit(3);
            let category = {
                _id: item._id,
                title: item.title,
                documents: []
            }
            for(let doc of categoryItems){
                let document = {
                    name: doc.name,
                    uniqueUrl: doc.uniqueUrl
                }
                
                category.documents.push(document);
            }
            
            categories.push(category);

        }

        res.render('user/categories', {categories: categories});

    })
}

//add new category
userController.doAddCategory = function(req, res){

    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    // create new document if logged in
    let newCategory = new Category(
        {
            title: req.body.title,
        }
    );

    newCategory.save(function(err, result){
        if(err)
        {
            res.json({status: 201, text: err})
        }else{
            res.json({
                status: 200,
                text: ''
            });
        }
    })

}

//delete category
userController.deleteCategory = function(req, res){

    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    //deactive category
    Category.findByIdAndUpdate(req.body._id, {isActive: false}, async function(err){
        if(!err){
            //find category's documents 
            await Document.find({category: mongoose.Types.ObjectId(req.body._id)}, async function(findErr, result){
                if(!findErr){
                    if(result.length != 0){
                        for(let item of result){
                            //deactive founded documents
                            await Document.findByIdAndUpdate(item._id, {isActive: false},function(updateErr){
                                if(!updateErr){
                                    return res.json({
                                        status: 200
                                    });
                                }else{
                                    return res.json({
                                        status: 502,
                                        err: updateErr
                                    });
                                }
                            });
                        }
                    }else{
                        return res.json({
                            status: 200
                        });
                    }
                }else{
                    return res.json({
                        status: 501
                    });
                }
                
            })

        }else{
            return res.json({
                status: 500
            });
        }

    });

}

//edit category
userController.editCategory = function(req, res){

    // redirects to /login if user hasn't logged in yet
    if (!req.isAuthenticated()) return res.redirect('/login');

    Category.findByIdAndUpdate(req.body._id, {title: req.body.title}, function(err, result){
        if(err){
            return res.json({
                status: 500
            });
        }else{
            return res.json({
                status: 200
            });
        }
    });

}

module.exports = userController;