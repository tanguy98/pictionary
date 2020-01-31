// IMPORTS
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;
const socketIO = require('socket.io');

//INSTANTIATE SERVER
var server = express();
var gameServer = require('http').createServer(server);
var io = socketIO(gameServer, {
    origins: "http://localhost:3000:*",
    pingInterval: 10*60*1000,
    pingTimeout: 1000,
});

// BODY PARSER CONFIGURATION
server.use(bodyParser.urlencoded({ extended:true }));
server.use(bodyParser.json());

// SETTING HEADERS
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true); // suite à un problème de connection avec socket.io
  next();
});

// CONFIGURATION DES ROUTES
server.use('/api/', apiRouter);

// GAME :
let rooms = [] // Those are the rooms currently used
let emptyRoom = {
    id_partie: null,
    players: [{
        username:"",
        score: 0,
        isCreator: false
    }],
    drawHistory: [],
    currentManche:0,
    words:[],
    currentWord: "",
    points: []
};

let room = emptyRoom;

//Pour un premier jet, on code tt comme s'il n'y avait qu'une seule room
// On verra plus tard comment adapter le code :
//(notamment en utiisant les socket.room pour remplacer le broadcast)

io.on('connection', function(socket) {
    console.log('User connected');

    //events from canvas :
    socket.on('draw', (data) => {
        room.drawHistory.push({lines: data.lines, width: data.width, color: data.color});
        socket.broadcast.emit('drawing', data);
    });

    //to implement
    socket.on('clear', (data) => {
        room.drawHistory = [];
        socket.broadcast.emit('clear');
    });

    socket.on('clear last', (data) => {
        room.drawHistory.splice(-1,1);
        socket.broadcast.emit('clear');
        for (const drawObject of room.drawHistory) {
            socket.broadcast.emit("draw", drawObject);
        }
    });

    //events from partie : 
    //to implement :
    socket.on('initiate-partie', (data) => {
        // Onrécupère la partie avec seul le créateur dedans
        room = data;
        console.log('initiate');
        console.log(room);
    });

    socket.on('join', (data) => {
        //on rajoute un utilisateur dans la partie qui est en cours :
        room.players.push({
            username:data.username,
            score: 0,
            isCreator: false
        });
        console.log('emiting joined')
        socket.broadcast.emit('joined', room);
        console.log('emitted joined')
    });

    socket.on('sucessful-guess', (data) => {
        room.points.push(data.id_user);
        socket.broadcast.emit('next-manche');

    } );
    socket.on('end-of-game', (data) => {
        // Calculer le score et annoncer le gagnant
    })
});

// LAUNCH SERVER :
gameServer.listen(8080, function() {
  console.log('Server en écoute');
});