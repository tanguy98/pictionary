// Imports
var bcrypt    = require('bcryptjs');

var jwtUtils  = require('../utils/jwt.utils');
var models    = require('../models');


// PARAMS
const saltRounds = 5;

// Routes
module.exports = {

  register: async function(req, res) {

    console.log('Creating new user...');
    //Données reçues
    const username = req.body.username;
    const password = req.body.password; // à hasher et saler
    // On véridfie que l'utilisateur n'existe pas déjà dans la base de donnée :

    let userFound = await models.User.findOne({where: {username: username}});
    console.log(!userFound);

    if (!userFound) {
      // Créer un nouvel user (en hashant et salant le mot de passe)
    bcrypt.hash(password, saltRounds)
    .then(async function(hash) {
      // hash est le mdp salé et hashé
      const newUser = await models.User.create({
        username: username,
        password: hash,
        isAdmin: 0,
        isCreator: 0,
        id_partie: null
      });
      // Envoie d'une confirmation au client
      res.status(200).json({ id: newUser.id});
    });

    } else {
      res.status(403).json({'error': 'User already exists'});
    }

    
  },

  login: async function(req, res) {
    
    console.log('Logging in ...');
    //Données reçues
    let username = req.body.username;
    let password = req.body.password; // à hasher et saler

    userFound = await models.User.findOne({where: {username: username}});
    hashedPassword = userFound.password;
    if (userFound) {
      // Load hash from your password DB.
      bcrypt.compare(password, hashedPassword).then(async function(response) {
        // response est un booléen vrai si les mots de passes corrspondent, faux sinon
        if (response) {
          token = jwtUtils.generateToken(userFound); //user.username et user.isAdmin sont utilisés
          res.json({
            loginSuccessful: true,
            username: userFound.username,
            id_user: userFound.id,
            token: token,
            isAdmin: userFound.isAdmin,
            username: userFound.username
          });
        } else {
          console.log('invaid password');
          res.json({
            loginSuccessful: false,
            error: 'invalid password'
          });
        };
      });
    } else { res.status(404).json({'error': 'User Not Found'});
    }
    


  }


}