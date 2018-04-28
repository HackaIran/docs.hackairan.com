
const express = require('express');
const router = express.Router();
const appController = require('../server/controller/AppController')
const userController = require('../server/controller/UserController')

const setGeneralRouters = function () {

  //Render Login
  router.get( '/login', function( req, res, err){
    res.render('login')
  });

  //Render Register
  router.get( '/register', function( req, res, err){
    res.render('register')
  });
  
  // route for register action
  router.post('/register', userController.doRegister);

  // route for login action
  router.post('/login', userController.doLogin);  

  //GET index
  router.get( '/', appController.index );

  //GET Document text by uniqueUrl
  router.get( '/getTextByUniqueUrl/:uniqueUrl', appController.getTextByUniqueUrl )

  //GET Author
  router.get( '/author/:id', appController.getAuthor )

  //GET Documents by CategoryID
  router.get('/category/:name', appController.getDocumentsByCategory )

  
};

const setUserRouters = function () {

  //GET myDocuments
  router.get( '/user', userController.getMyDocuments )

  //GET Document
  router.get( '/user/document/:id', userController.getDocument )

  //GET CreateDocument
  router.get( '/user/createdocument', userController.createDocument )

  //Logout
  router.get('/user/logout', userController.logout )
  
};

setGeneralRouters();
module.exports = router;
