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
    })
  },

  createPartie: async function(req,res) {
    console.log('Creating partie...');
    let id_user = req.body.id;
    // créer une nouvelle partie
    const partie_cree = await models.Partie.create(); //partie_cree.id
    // Modifier isCreator et id_partie dans user
    await User.update({ isCreator:true, id_partie:partie_cree.id }, {
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
    await User.update({ isCreator:false, id_partie:id_partie }, {
      where: {
        id:id_user
      }
    });
  },

  deletePartie: async function(req,res) {
    console.log('Deleting partie...');
    let id = req.body.id_partie; //id_partie
    //Logging out des utilisateurs :
    await User.update({ isCreator:false, id_partie:null }, {
      where: {
        id_partie: {id}
      }
    });
    //Suppression de la partie :
    await models.Partie.destroy({where: { id }});
    


  
  
  }

}