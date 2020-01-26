
const axios = require('axios');


module.exports = {

    getRooms () {
        console.log('Getting rooms...');
        return axios.get('http://localhost:8080/api/partie/getParties');
    },

    createPartie (id_user) {
        console.log('Creating partie ...');
        return axios.post('http://localhost:8080/api/partie/createPartie', { id_user });
    },

    joinPartie (id_user,id_partie) {
        console.log('Joining partie...');
        return axios.post('http://localhost:8080/api/partie/createPartie', { id_user, id_partie });
        //implementing
    },

    getWords() {
        console.log('Getting words...');
        return axios.get('http://localhost:8080/api/word/getWords');
    },

    deleteWord(id_word) {
        console.log('Deleting word...');
        return axios.delete('http://localhost:8080/api/word/deleteWord', {data: {id_word: id_word} });
    },

    createWord(word) {
        console.log('Creating word...');
        return axios.post('http://localhost:8080/api/word/createWord', { word: {word} } );
    },

    deletePartie(id_partie) {
        console.log('Deleting partie...');
        return axios.delete('http://localhost:8080/api/partie/deletePartie', {data: {id_partie: id_partie} });
    
    },


    login(username, password) {
        console.log('Logging in ...');
        return axios.post('http://localhost:8080/api/users/register', { username: username, password: password })
        
    },

    register(username, password) {
        console.log('Registering new user ...');
        return axios.post('http://localhost:8080/api/users/register', { username: username, password: password });
    },


}
