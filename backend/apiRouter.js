//Imports
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var partieCtrl = require('./routes/partieCtrl');

//Router
exports.router = (function() {
    var apiRouter = express.Router();

    apiRouter.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
      });

    //User routes
    apiRouter.route('/users/register').post(usersCtrl.register);
    apiRouter.route('/users/login').post(usersCtrl.login);

    //Room routes
    apiRouter.route('/partie/getParties').get(partieCtrl.getParties);
    apiRouter.route('/partie/createPartie').post(partieCtrl.createPartie);
    
    return apiRouter;
})();
