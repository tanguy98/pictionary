// IMPORTS
var express = require('express');

/*
const http = require('http'); // import le module http de node.js
const app = require('./app');
*/

//INSTANTIATE SERVER
var server = express();

// CONFIGURE ROUTES
server.get('/', function (res,res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Bonjour de la part du server !</h1>');
});

// LAUNCH SERVER :

server.listen(3000, function() {
  console.log('Server en écoute')
});

/*

// normalizePort est une fonction qui renvoie un port c=valide à partir d'une string ou autre
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// on définit le port d'écoute :
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


// errorHandler : On définit une fonction qui recherche les différentes erreurs et les gère de façon appropriée

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création d'un server qui execute app (application express)
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port, ()=> {console.log('Server en écoute')});

*/