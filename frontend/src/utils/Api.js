
const axios = require('axios');


module.exports = {

    getRooms () {
        console.log('Getting Rooms...');
        return axios.get('http://localhost:8080/api/partie/getParties');
    },

    createPartie (id) {
        console.log('Creating Partie ...');
        return axios.post('http://localhost:8080/api/partie/createPartie', { id });
    },

    joinPartie (id_user,id_partie) {
        //to implement
    },


}
