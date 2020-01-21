// Imports
var bcrypt    = require('bcryptjs');
var jwtUtils  = require('../utils/jwt.utils');
var models    = require('../models');
var asyncLib  = require('async');

// Constants
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

// Routes
module.exports = {
  register: function(req, res) {
    
    // Params
    var username = req.body.username;
    var password = req.body.password;

    if (username == null || password == null) {
      return res.status(400).json({ 'error': 'missing username or password' });
    }

    if (username.length >= 13 || username.length <= 4) {
      return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          attributes: ['username'],
          where: { username: username }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if (!userFound) {
          bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
            done(null, userFound, bcryptedPassword);
          });
        } else {
          return res.status(409).json({ 'error': 'user already exist' });
        }
      },
      function(userFound, bcryptedPassword, done) {
        var newUser = models.User.create({
          username: username,
          password: bcryptedPassword,
          isAdmin: 0
        })
        .then(function(newUser) {
          done(newUser);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'cannot add user' });
        });
      }
    ], function(newUser) {
      if (newUser) {
        return res.status(201).json({
          'id_user': newUser.id_user
        });
      } else {
        return res.status(500).json({ 'error': 'cannot add user' });
      }
    });
  },

  login: function(req, res) {
    
    // Params
    var username = req.body.username;
    var password = req.body.password;

    if (username == null ||  password == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          where: { username: username }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if (userFound) {
          bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
            done(null, userFound, resBycrypt);
          });
        } else {
          return res.status(404).json({ 'error': 'user not exist in DB' });
        }
      },
      function(userFound, resBycrypt, done) {
        if(resBycrypt) {
          done(userFound);
        } else {
          return res.status(403).json({ 'error': 'invalid password' });
        }
      }
    ], function(userFound) {
      if (userFound) {
        return res.status(201).json({
          'id_user': userFound.id_user,
          'token': jwtUtils.generateTokenForUser(userFound)
        });
      } else {
        return res.status(500).json({ 'error': 'cannot log on user' });
      }
    });
  },

  getUserProfile: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var id_user = jwtUtils.getUserId(headerAuth); //risque d'erreur ?

    if (userId < 0)
      return res.status(400).json({ 'error': 'wrong token' });

    models.User.findOne({
      attributes: [ 'user_id', 'username', 'isAdmin'],
      where: { id_user: id_user }
    }).then(function(user) {
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(404).json({ 'error': 'user not found' });
      }
    }).catch(function(err) {
      res.status(500).json({ 'error': 'cannot fetch user' });
    });
  },

  updateUserProfile: function(req, res) {
    // Getting auth header
    var headerAuth  = req.headers['authorization'];
    var id_user = jwtUtils.getUserId(headerAuth);

    // Params
    var id_partie = req.body.id_partie;
    var isCreator = req.body.isCreator;

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          attributes: ['id_user', 'id_partie', 'isCreator'],
          where: { id_user: id_user }
        }).then(function (userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          userFound.update({
            id_partie: (id_partie ? id_partie : userFound.id_partie)
          }).then(function() {
            done(userFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user' });
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
      function(userFound, done) {
        if(userFound) {
          userFound.update({
            isCreator: (isCreator ? isCreator : userFound.isCreator)
          }).then(function() {
            done(userFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user' });
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      }
    ], function(userFound) {
      if (userFound) {
        return res.status(201).json(userFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update user profile' });
      }
    });
  }
}