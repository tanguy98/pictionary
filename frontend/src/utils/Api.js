
const axios = require('axios');

/*
Objects shape

objectUser = { id_ser: int, email: string, username: string, password: string, isAdmin: boolean, nbPartiesWon: int, nbPartiesPlayed: int, playingPartieId: int}

*/


module.exports = {

    // Access: User
    // Parametres: ( token: string, callback: function(error))
    // Result: [{ id: int, partieName: string, creatorId: int, isEnded: boolean, players: int, places: int, nbRounds: int, createdAt: date, user: objectUser }]
    // Function: liste les partie jouables
    getRooms (token, callback) {
        return axios({
            url: 'http://localhost:8080/api/parties/', 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token
            },
        }).then(reponse => {
            return reponse.data;
        }).catch(error => {
            callback(error);
            return [];
        });
    },

    // Access: User
    // Parametres: ( roomId: int, token: string, callback: function(error))
    // Result: [{ id: int, partieName: string, creatorId: int, isEnded: boolean, players: int, places: int, nbRounds: int }]
    // Function: renvoie les parametres d'une partie
    getRoom (roomId, token, callback) {
        return axios({
            url: 'http://localhost:8080/api/parties/'+roomId, 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token
            },
        }).then(reponse => {
            return reponse.data;
        }).catch(error => {
            callback(error);
            return {};
        });
    },

    // Access: all
    // Params: (username: string, password: string, confirmPassword: string, callback: function(error))
    // Result: { userCreated: boolean }
    // Function: cree un user
    register (username, password, callback) {
        return axios({
            url: 'http://localhost:8080/api/users/register', 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username: username,
                password: password,
                isAdmin: false
            }
        }).then(reponse => {
            return { userCreated: true }
        }).catch(error => {
            callback(error);
            return { userCreated: false }
        });
    },

    // Access: all
    // Parametres: ( username: string, password: string, callback: function(error))
    // Result: { token: string, user: objectUser }
    // Function: conexion d'un user existant

    login (username, password, callback) {
        return axios({
            url: 'http://localhost:8080/api/users/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            data: {
                username: username,
                password: password,
            }
        }).then((res) => {
            return res.data;
        }).catch(error => {
            callback(error);
            return { 'token': "", 'username': null, 'userId': -1, 'isAdmin': false}
        });
    },



    // Access: Admin
    // Params: ( partieName:string, places: int, nbRounds: int, token: string, callback: function(error))
    // Result: { partieCreated: boolean , roomId: int }
    // Function: liste toutes les parties
    createPartie (partieName, places, nbRounds, token, callback) {
        return axios({
            url: 'http://localhost:8080/api/parties',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token,
            },
            data: {
                partieName: partieName,
                places: places,
                nbRounds: nbRounds
            }
        }).then(reponse => {
            return { partieCreated: true, roomId: reponse.data.id };
        }).catch(error => {
            callback(error);
            return { partieCreated: false, roomId: -1 };
        });
    },

    


    // Access: User
    // Parametres: ( roomId: int, token: string, callback: function(error))
    // Result: { id: int, partieName: string, creatorId: int, isEnded: boolean, players: int, places: int, nbRounds: int, listPlayers:  {id: int, username: string } }
    // Function: join une room
    joinRoom (roomId, token, callback) {
        return axios({
            url: 'http://localhost:8080/api/parties/'+roomId+'/join/', 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token
            },
        }).then(reponse => {
            return true
        }).catch(error => {
            callback(error);
            return false;
        });
    },

    // Access: User
    // Parametres: ( roomId: int, won: boolean, token: string, callback: function(error))
    // Result: { partieLeft: true }
    // Function: leave une room
    leaveRoom (roomId, won, token, callback) {
        return axios({
            url: 'http://localhost:8080/api/parties/'+roomId+'/leave/', 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token
            },
            data: {
                won: won
            }
        }).then(reponse => {
            return { partieLeft: true };
        }).catch(error => {
            callback(error);
            return { partieLeft: false };
        });
    },
    // Access: Admin
    // Parametres: ( roomId: int, token: string, callback: function(error))
    // Result [{ id: int, partieName: string, creatorId: int, isEnded: boolean, players: int, places: int, nbRounds: int }]
    // Function deletes a room
    deleteRoom (roomId, token, callback) {
        return axios({
            url: 'http://localhost:8080/api/parties/' + roomId, 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token
            },
        }).then(reponse => {
            return reponse.data;
        }).catch(error => {
            callback(error);
            return [];
        });
    },
    // Access: User
    // Parametres: ( token: string, callback: function(error))
    // Result [{ id: int, word: string }]
    // Function liste tous les mots
    getWords (token, callback) {
        return axios({
            url: 'http://localhost:8080/api/words/', 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token
            },
        }).then(reponse => {
            return reponse.data;
        }).catch(error => {
            callback(error);
            return []
        });
    },
    // Access: Admin
    // Parametres: ( word: string, token: string, callback: function(error))
    // Result [{ id: int, word: string }]
    // Function ajoute un mot
    addWord (word, token, callback) {
        return axios({
            url: 'http://localhost:8080/api/words/', 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token
            },
            data: {
                word: word
            }
        }).then(reponse => {
            return reponse.data;
        }).catch(error => {
            callback(error);
        });
    },

    // Access: Admin
    // Parametres: ( word: string, token: string, callback: function(error))
    // Result [{ id: int, word: string }]
    // Function supprime un mot
    deleteWord (word, token, callback) {
        return axios({
            url: 'http://localhost:8080/api/words', 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token
            },
            data: {
                word: word
            }
        }).then(reponse => {
            return reponse.data;
        }).catch(error => {
            callback(error);
            return [];
        });
    },
    // Access: User
    // Parametres: ( userId: string, token: string, callback: function(error))
    // Result { 'id', 'email', 'username', 'playingPartieId', 'nbPoints', 'nbLocalPoints', 'nbPartiesWon', 'nbPartiesPlayed', 'nbPartiesHosted', 'isAdmin' }
    // Function liste tous les mots
    getUser (userId, token, callback) {
        return axios({
            url: 'http://localhost:8080/api/users/'+userId, 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token
            },
        }).then(reponse => {
            return reponse.data;
        }).catch(error => {
            callback(error);
            return []
        });
    },
    // Access: User
    // Parametres: ( userId: string, token: string, callback: function(error))
    // Result [ { 'id', 'email', 'username', 'playingPartieId', 'nbPoints', 'nbLocalPoints', 'nbPartiesWon', 'nbPartiesPlayed', 'nbPartiesHosted', 'isAdmin' }]
    // Function liste tous les mots
    getPartiesCreated(userId, token, callback) {
        return axios({
            url: 'http://localhost:8080/api/parties/by/'+userId, 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+token
            },
        }).then(reponse => {
            return reponse.data;
        }).catch(error => {
            callback(error);
            return []
        });
    },
}
