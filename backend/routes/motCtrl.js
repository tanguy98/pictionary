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
        // créer une nouvelle partie
        console.log(word.word);
        const word_cree = await models.Word.create( {word: req.body.word.word} );
        res.json({data: partie_cree.id});
      },

    deleteWord: async function(req,res) {
        console.log('Deleting word ...');
        let id = req.body.id_word;
        await models.Word.destroy({where: { id }});
    }


}