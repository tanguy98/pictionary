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

/*
// A ADAPTER
const express = require('express');
const app = express(); //server
const http = require('http').Server(app); //a ajouter
const io = require('socket.io')(http);// a ajouter
const port = process.env.PORT || 3000;// Pas la peine

app.use(express.static(__dirname + '/public')); //Server a la place de app

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
*/