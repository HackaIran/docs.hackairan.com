const appController = {};
const Document = require('../model/Document');
const mongoose = require('mongoose');
const User = require('../model/User');
const Category = require('../model/Category');
const moment = require('moment');
const Remarkable = require('remarkable');
const getHashtags = require('../helper/extractor');
const md = new Remarkable('full');
const Tag = require('../model/Tag');

appController.index = async function (req, res) {

    let selectedUUrl = req.params.uniqueUrl || false;
    if(selectedUUrl){
        let ifExist = await Document.findOne({uniqueUrl: selectedUUrl})
        if(!ifExist){
            selectedUUrl = false;
        }
    }
    
    Promise.all([
        Document.find({isActive: true}).populate('author').populate('category'),
        Category.find({isActive: true}),
        Tag.find({isActive: true,})
    ]).then(([documentResult , categoryResult, tagResult]) => {
        
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
        }
        
        for(let tagItem of tagResult){
            if(tagItem.documents.length != 0){
                tags.push(tagItem.tagName);
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
            tags: tags,
            selectedItem: selectedUUrl
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
            res.json({
                status: 200,
                title: result.name,
                text: preProccessMd(md.render(result.text))
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

appController.filterDocuments = function(req, res){
    let documents = [];
    let filterTag = req.params.tag;
    let filterCategory = req.params.category;
    Document.find({isActive: true}).populate('category').populate('author').exec(function(err, result){
        for(let item of result){
            if(filterCategory != '-'){
                if(item.category._id == req.params.category){
                    if(filterTag != '-'){
                        if(item.tags.indexOf(filterTag) != -1){
                            documents.push({
                                uniqueUrl: item.uniqueUrl,
                                name: item.name,
                                author: item.author.fullName,
                                category: item.category.title,
                                summary: item.summary,
                                modifiedAt: moment(item.modifiedAt).format('YYYY-MM-DD'),
                            });
                        }
                    }else{
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
            }else{
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

const preProccessMd = (text) => {

    // extracting hashtags
    const hashtags = getHashtags(text);
    for (let hashtag of hashtags) {
        text = text.split('#' + hashtag);
        text = text.join(`<span class="hashtag">#${ hashtag }</span>`);
    }

    return text;
}

module.exports = appController;