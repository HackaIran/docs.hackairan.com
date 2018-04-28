const appController = {};
const Document = require('../model/Document');
const mongoose = require('mongoose');
const User = require('../model/User');
const Category = require('../model/Category');
const moment = require('moment');

appController.index = function (req, res) {

    Promise.all([
        Document.find({}).populate('author').populate('category'),
        Category.find({}),
    ]).then(([documentResult , categoryResult]) => {
        
        //handling Documents
        let documents = [];
        for (let item of documentResult) {

            documents.push({
                uniqueUrl: item.uniqueUrl,
                name: item.name,
                author: item.author.fullName,
                category: item.category.title,
                summary: item.summary,
                modifiedAt: moment(item.modifiedAt).format('YYYY-MM-DD'),
            })
        }
        
        //handling Categories and tags
        let categories = [];
        let tags = [];
        for(let item of categoryResult){
            categories.push(item.title);
            tags.concat(item.tags);
        }

        //returning result
        res.render('index', {
            documents: documents,
            categories: categories
        })

    });
}

appController.getTextByUniqueUrl = function (req, res) {
    Document.findOne({
        uniqueUrl: req.params.uniqueUrl
    }, function (err, result) {
        if (err || !result) {
            res.json({
                status: 404,
                text: ''
            })
        } else {
            res.json({
                status: 200,
                text: result.text
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

appController.getCategories = function (req, res) {
    Category.find(function (err, result) {
        if (!err) {
            res.json(result)
        } else {
            res.render('error')
        }
    })
}

appController.getDocumentsByCategory = function (req, res) {
    Document.find({
        category: mongoose.Types.ObjectId(req.params.id)
    }, function (err, result) {
        if (!err) {
            res.json(result)
        } else {
            res.render('error')
        }
    });
}

module.exports = appController;