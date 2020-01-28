// IMPORTS
var models = require('../models');

//ROUTES :

module.exports = {

    getWords: async function(req, res) {
        console.log('Getting words...');
        // select id from parties
          allWords = await models.Word.findAll({
            attributes: ['id', 'word']
          });
          // Tous les mots de la db sont envoyées au front
          res.json({data: allWords});
    },

    createWord: async function(req,res) {
        console.log('Creating word...');
        let word = req.body.word;

        //On vérifie que le mot n'est pas déjà dans la DB
        let motFound = await models.Word.findOne({where: {word}});

        if (!motFound) {
          // créer un nouveau mot
          const wordCreated = await models.Word.create({word: req.body.word});
          res.status(200).json({data: wordCreated.id});
        } else {
          res.status(409).json({'error': 'Word  already exists'});
        }
      },

    deleteWord: async function(req,res) {
        console.log('Deleting word ...');
        let id = req.body.id_word;
        await models.Word.destroy({where: { id }});
    }


}