const appController = {};
const Document = require('../model/Document');
const mongoose = require('mongoose');
const User = require('../model/User');
const Category = require('../model/Category');

appController.index = function (req, res) {
    
    // loading all documents
    const documents = [
        {
            id: 'open-source',
            title: 'Open-Source Guideline',
            creator: 'Mohammad H. Shahin',
            date: '2018-06-29',
            abstract: 'short of description of this guideline is something like this. as you can see sometimes its longer than what you think!'
        },
        {
            id: 'gpl3',
            title: 'Getting deep in GPL-3',
            creator: 'Mohammad H. Shahin',
            date: '2018-07-22',
            abstract: 'GPL-3 is a famous license, In this article we will asses it deeply!'
        },
        {
            id: 'how-to-work-with-nerdpitch',
            title: 'How to work with NerdPitch',
            creator: 'Pouya MozaffarMagham',
            date: '2018-03-11',
            abstract: 'NerdPitch is the most beloved tool for sharing knowledge and ideas. Let\'s see how it excatly works!'
        },
        {
            id: 'why-we-held-hackademy',
            title: 'Why we held Hackademy behind the certain?',
            creator: 'Alireza Sheikholmolouki',
            date: '2019-01-01',
            abstract: 'After one year of holding Hackademy, there are some secrets to leak about why we excatly held hackademy.'
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