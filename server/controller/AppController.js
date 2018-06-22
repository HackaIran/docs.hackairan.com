const appController = {};
const Document = require('../model/Document');
const mongoose = require('mongoose');
const User = require('../model/User');
const Category = require('../model/Category');
const moment = require('moment');
const showdown = require('showdown');

appController.index = function (req, res) {

    Promise.all([
        Document.find({isActive: true}).populate('author').populate('category'),
        Category.find({isActive: true}),
    ]).then(([documentResult , categoryResult]) => {
        
        //handling Documents
        let documents = [];
        let tags = [];
        for (let item of documentResult) {
            documents.push({
                uniqueUrl: item.uniqueUrl,
                name: item.name,
                author: item.author.fullName,
                category: item.category.title,
                summary: item.summary,
                modifiedAt: moment(item.modifiedAt).format('YYYY-MM-DD'),
            })
            if(item.tags){
                for(let newTag of item.tags){
                    if(tags.indexOf(newTag) == -1){
                        tags.push(newTag)
                    }
                }
            }
        }
        
        //handling Categories and tags
        let categories = [];
        for(let item of categoryResult){
            categories.push({title:item.title, _id:item._id});
        }

        //returning result
        res.render('index', {
            title: 'HackaDocs',
            documents: documents,
            categories: categories,
            tags: tags
        })

    });
}

appController.getTextByUniqueUrl = function (req, res) {
    Document.findOne({
        uniqueUrl: req.params.uniqueUrl,
        isActive: true
    }, function (err, result) {
        if (err || !result) {
            res.json({
                status: 404,
                text: ''
            })
        } else {
            let converter = new showdown.Converter();
            res.json({
                status: 200,
                title: result.name,
                text: converter.makeHtml(result.text)
            })
        }
    })
}

appController.getAuthor = function (req, res) {
    User.findById(req.params.id).exec(function (err, user) {
        if (!err) {
            res.json(user)
        } else {
            res.render('error')
        }
    });
}

appController.getDocumentsByCategory = function (req, res) {
    let documents = [];
    Document.find({isActive: true}).populate('category').populate('author').exec(function(err, result){
        for(let item of result){
            if(item.category._id == req.params.id){
                documents.push({
                    uniqueUrl: item.uniqueUrl,
                    name: item.name,
                    author: item.author.fullName,
                    category: item.category.title,
                    summary: item.summary,
                    modifiedAt: moment(item.modifiedAt).format('YYYY-MM-DD'),
                });
            }
            
        }
        res.json(documents);
    });
    
}

appController.getDocumentsByTag = function(req, res){
    let documents = [];
    Document.find({isActive: true, tags: req.params.tag}).populate('category').populate('author').exec(function(err, result){
        for(let item of result){
            documents.push({
                uniqueUrl: item.uniqueUrl,
                name: item.name,
                author: item.author.fullName,
                category: item.category.title,
                summary: item.summary,
                modifiedAt: moment(item.modifiedAt).format('YYYY-MM-DD'),
            });
        }
        res.json(documents);
    });
    
}

module.exports = appController;