// IMPORTS
var models    = require('../models');
var jwt = require('jsonwebtoken');
var asyncLib = require('async');
//CONSTANTS

// ROUTES :

module.exports = {

    getParties: async function(req, res) {

        allParties = await models.Partie.findAll({attributes: ['id']});
        res.json({data: allParties});

    },

    createPartie: async function(req,res) {
        let id_user = req.body.id;
        
        // créer une nouvelle partie
        const partie_cree = await Partie.create(); //partie_cree.id

        // Modifier isCreator et id_partie dans user
        await User.update({ isCreator:true, id_partie:partie_cree.id }, {
            where: {
              id:id_user
            }
          });

          res.json({data: partie_cree.id});


    }


}