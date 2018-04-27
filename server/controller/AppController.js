const appController = {};
const Document = require('../model/Document');
const mongoose = require('mongoose');
const User = require('../model/User');
const Category = require('../model/Category');

appController.index = function (req, res) {
    
    // loading all documents
    const documents = [
        {
            title: 'Open-Source Guideline',
            creator: 'Mohammad H. Shahin',
            date: '2018-06-29',
            abstract: 'short of description of this guideline is something like this. as you can see sometimes its longer than what you think!'
        }
    ]

    res.render('index', { documents: documents })
}

appController.getDocument = function (req, res){
    Document.findById(req.params.id).exec(function(err, result){
        res.json(result)
    });
}

appController.getAuthor = function(req, res){
    User.findById(req.params.id).exec(function(err, user){
        if(!err){
            res.json(user)
        }else{
            res.render('error')
        }
    });
}

appController.getCategories = function(req, res){
    Category.find(function(err, result){
        if(!err){
            res.json(result)
        }else{
            res.render('error')
        }
    })
}

appController.getDocumentsByCategory = function(req, res){
    Document.find({category:mongoose.Types.ObjectId(req.params.id)}, function(err, result) {
        if(!err){
            res.json(result)
        }else{
            res.render('error')
        }
    });
}

module.exports = appController;