// Imports
var bcrypt    = require('bcryptjs');
var jwtUtils  = require('../utils/jwt.utils');
var models    = require('../models');
var jwtUtils = require('../utils/jwt.utils');

// PARAMS
const saltRounds = 5;

// Routes
module.exports = {

  register: async function(req, res) {

    console.log('Creating new user...');
    //Données reçues
    let username = req.body.username;
    let password = req.body.password; // à hasher et saler
    // Créer un nouvel user (en hashant et salant le mot de passe)
    bcrypt.hash(myPlaintextPassword, saltRounds).then(async function(hash) {
      // hash est le mdp salé et hashé
      const newUser = await models.User.create({
        username: username,
        password: hash,
        isAdmin: 0,
        isCreator: 0,
        id_partie: null
      })
    });
    
    // Envoyer une confirmation au client ? ou bien se connecter automatiquement ?
    
  },

  login: async function(req, res) {
    
    console.log('Logging in ...');
    //Données reçues
    let username = req.body.username;
    let password = req.body.password; // à hasher et saler

    user = await models.User.findOne({where: {username: username}});
    hashedPassword = user.password;

    // Load hash from your password DB.
    bcrypt.compare(password, hashedPassword).then(async function(res) {
        // res est un booléen vrai si les mots de passes corrspondent, faux sinon
        if (res) {
          token = generateToken(user); //user.username et user.isAdmin sont utilisés
          res.json({
            'loginSuccessful': 1,
            'username': user.username,
            'id_user': user.id,
            'token': token,
            'isAdmin': user.isAdmin
        });
        } else {
          res.json({
            'loginSuccessful': 0,
          });
        };
    });


  }


}