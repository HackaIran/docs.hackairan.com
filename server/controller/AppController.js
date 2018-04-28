const appController = {};
const Document = require('../model/Document');
const mongoose = require('mongoose');
const User = require('../model/User');
const Category = require('../model/Category');
const moment = require('moment');

appController.index = function (req, res) {
    
    // loading all documents
    Document.find({}).populate('author').populate('category').exec(function(err, result){
        let documents = [];
        for(let item of result){
            console.log(item.modifiedAt)
            documents.push({
                uniqueUrl: item.uniqueUrl,
                name: item.name,
                author: item.author.fullName,
                category: item.category.title,
                summary: item.summary,
                modifiedAt: moment(item.modifiedAt).format('YYYY-MM-DD'),
            })
        }
        res.render('index', { documents: documents })
    });


    
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