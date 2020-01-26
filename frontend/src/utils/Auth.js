
const axios = require('axios');
const jwt = require('jsonwebtoken');

// Qu'est ce que je veux ici ?
// get User logged : Booléen, uder id, is admin
//méthode pour login mon user (vérification dans la db + token ? + set cookie)
// méthode pour logout mon user (discard token + reset cookie)


class Auth {
    
    constructor() {
    //devrait aller chercher l'état dans les cookies plutôt
      this.authenticated = false;
    }
  
    login(callback) {
      this.authenticated = true;
      callback();
    }
  
    logout(callback) {
      this.authenticated = false;

      callback();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new Auth();
  