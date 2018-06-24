
const express = require('express');
const router = express.Router();
const appController = require('../server/controller/AppController')
const userController = require('../server/controller/UserController')

const setGeneralRouters = function () {

  //Render Login
  router.get( '/login', function( req, res, err){
    res.render('user/login', {title: 'Login'})
  });

  //Render Register
  router.get( '/register', function( req, res, err){
    res.render('user/register', { title: 'Register'})
  });
  
  // route for register action
  router.post('/register', userController.doRegister);

  // route for login action
  router.post('/login', userController.doLogin);  

  //GET index
  router.get( '/', appController.index );

  //GET index with selected document
  router.get( '/doc/:uniqueUrl' , appController.index)

  //GET Document text by uniqueUrl
  router.get( '/getTextByUniqueUrl/:uniqueUrl', appController.getTextByUniqueUrl )

  //GET Author
  router.get( '/author/:id', appController.getAuthor )

  //GET Documents by Category
  router.get('/category/:id', appController.getDocumentsByCategory )

  //GET Documents by Tag
  router.get('/tag/:tag', appController.getDocumentsByTag );

};

const setUserRouters = function () {

  //GET myDocuments
  router.get( '/user', userController.home )

  //GET CreateDocument
  router.get( '/user/createdocument', userController.createDocument )

  //POST doCreateDocument
  router.post( '/user/doCreateDocument', userController.doCreateDocument );

  //GET editDocument page
  router.get( '/user/editDocument/:uniqueUrl', userController.editDocument )

  //POST doEditDocument
  router.post( '/user/doEditDocument', userController.doEditDocument )

  //Logout
  router.get('/user/logout', userController.logout )

  //POST delete document
  router.post('/user/deleteDocument', userController.deleteDocument)

  //Get Categories
  router.get('/user/categories', userController.categories)

  //POST add category
  router.post('/user/doAddCategory', userController.doAddCategory)

  //POST delete category
  router.post('/user/deleteCategory', userController.deleteCategory)
  
  //POST edit category
  router.post('/user/editCategory', userController.editCategory)
};

setGeneralRouters();
setUserRouters();

module.exports = router;
