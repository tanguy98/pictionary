// IMPORTS
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;

//INSTANTIATE SERVER
var server = express();

// BODY PARSER CONFIGURATION
server.use(bodyParser.urlencoded({ extended:true }));
server.use(bodyParser.json());

// RENVOI VERS L'API ROUTER
server.use('/api/', apiRouter);

// LAUNCH SERVER :
server.listen(8080, function() {
  console.log('Server en écoute');
});

