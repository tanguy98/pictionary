//Imports
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var partieCtrl = require('./routes/partieCtrl');
var motCtrl = require('./routes/motCtrl');

//Router
exports.router = (function() {
    var apiRouter = express.Router();

    // Paramètres de connexion
    apiRouter.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        next();
      });

    //User routes
    apiRouter.route('/users/register').post(usersCtrl.register);
    apiRouter.route('/users/login').post(usersCtrl.login);
    //to implement :
    apiRouter.route('/users/assertAuthorization').get(usersCtrl.assertAuthorisation);
  
    //Room routes
    apiRouter.route('/partie/getParties').get(partieCtrl.getParties); //plante en ce moment...
    apiRouter.route('/partie/createPartie').post(partieCtrl.createPartie);
    apiRouter.route('/partie/joinPartie').post(partieCtrl.joinPartie);
    apiRouter.route('/partie/deletePartie').delete(partieCtrl.deletePartie); 

    //Word routes
    apiRouter.route('/word/getWords').get(motCtrl.getWords);
    apiRouter.route('/word/deleteWord').delete(motCtrl.deleteWord);
    apiRouter.route('/word/createWord').post(motCtrl.createWord);
    
    return apiRouter;
})();
