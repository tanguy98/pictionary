// IMPORTS
var models    = require('../models');

// ROUTES :

module.exports = {

  getParties: async function(req, res) {
    console.log('Getting parties...');
    const allParties = await models.Partie.findAll({attributes: ['id', 'createdAt']});
    //On va remplir rooms à notre sauce !
    const roomsDB = await models.Partie.findAll({ include: [{model: models.User}]});
    //SETTING THE RESPONSE :
    res.json({
      data: allParties,
      rooms: roomsDB
    });
  },

  createPartie: async function(req,res) {
    console.log('Creating partie...');
    let id_user = req.body.id_user;
    console.log(req.body.id_user);
    console.log(req.body);
    // créer une nouvelle partie
    const partie_cree = await models.Partie.create(); //partie_cree.id
    // Modifier isCreator et id_partie dans user
    await models.User.update({ isCreator:true, id_partie:partie_cree.id }, {
        where: {
          id:id_user
        }
      });
    res.json({data: partie_cree.id});
  },

  joinPartie: async function(req,res) {
    console.log('Joining partie...');
    let id_user = req.body.id_user;
    let id_partie = req.body.id_partie;
    // Modification de la partie dans laquelle le joueur est actuellement
    await models.User.update({ isCreator:false, id_partie:id_partie }, {
      where: {
        id:id_user
      }
    });
    res.status(200).json({data: id_partie});
  },

  deletePartie: async function(req,res) {
    console.log('Deleting partie...');
    let id = req.body.id_partie; //id_partie
    //Logging out des utilisateurs :
    await models.User.update({ isCreator:false, id_partie:null }, {
      where: {
        id_partie: id
      }
    });
    //Suppression de la partie :
    await models.Partie.destroy({where: { id }});
    res.status(200).json({'deleted': true});
  },

  leavePartie: async function(res,req) {
    console.log('Leaving partie (to implement)...');
    let id = req.body.id_user; //id_user
    //Logging out des utilisateurs :
    await models.User.update({ isCreator:false, id_partie:null }, {
      where: {
        id_user: id
      }
    });
    res.status(200).json({'partieLeft': true});
  }
}