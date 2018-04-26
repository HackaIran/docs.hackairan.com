const express = require('express');
const router = express.Router();

const appController = require('../server/controller/AppController')

//GET index
router.get( '/', appController.index );

//GET Document
router.get( '/doc/:id', appController.getDocument )

//GET Author
router.get( '/author/:id', appController.getAuthor )

//GET Categories
router.get('/categories', appController.getCategories )

//GET Documents by CategoryID
router.get('/category/:categoryId', appController.getDocumentsByCategory )

module.exports = router;
