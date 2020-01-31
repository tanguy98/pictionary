
const axios = require('axios');

function getRooms () {
    console.log('Getting rooms...');
    return axios.get('http://localhost:8080/api/partie/getParties');
}

function createPartie (id_user) {
    console.log('Creating partie ...');
    return axios.post('http://localhost:8080/api/partie/createPartie', {id_user});
}

function joinPartie (id_user,id_partie) {
    console.log('Joining partie...');
    return axios.post('http://localhost:8080/api/partie/joinPartie', { id_user, id_partie });
    //implementing
}

function getWords() {
    console.log('Getting words...');
    return axios.get('http://localhost:8080/api/word/getWords');
}

function deleteWord(id_word) {
    console.log('Deleting word...');
    return axios.delete('http://localhost:8080/api/word/deleteWord', {data: {id_word: id_word} });
}

function createWord(word) {
    console.log('Creating word...');
    return axios.post('http://localhost:8080/api/word/createWord', {word} );
}

function deletePartie(id_partie) {
    console.log('Deleting partie...');
    return axios.delete('http://localhost:8080/api/partie/deletePartie', {data: {id_partie: id_partie} });
}

function login(username, password) {
    console.log('Logging in ...');
    return axios.post('http://localhost:8080/api/users/login', { username, password })
}

function register(username, password) {
    console.log('Registering new user ...');
    return axios.post('http://localhost:8080/api/users/register', { username, password });
}

function assertAuthorisation () {
    console.log('Asserting authorisation ...');
    return axios.get('http://localhost:8080/api/users/assertAuthorization')

}

function leavePartie(id_user) {
    console.log('Leaving room (to implement) ...');
    // to implement
}


module.exports = {
    getRooms,
    createPartie,
    joinPartie,
    getWords,
    deleteWord,
    createWord,
    deletePartie,
    login,
    register,
    assertAuthorisation,
    leavePartie
}
