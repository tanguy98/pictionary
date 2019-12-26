  // Connection à la base de données avec SEQUELIZE :
/*
  const Sequelize = require('sequelize');
  // arguments : db, username, password, {host, dialect, logging (booléen pour afficher les réquêtes dans le log)}
  const sequelize = new Sequelize('pictionary', 'Tanguy', 'Tanguy98', {
    host: 'localhost',
    dialect: 'mysql',
    logging : true
  }); 

  // CRéation d'un modèle pour les parties :

  const Model = Sequelize.Model;
  class partie extends Model {}
  partie.init({
    // attributes
    id_partie: {
      type: Sequelize.SMALLINT,
      allowNull: false
  }, {
    sequelize,
    modelName: 'user'
    // options
  });

    // Note: using `force: true` will drop the table if it already exists
  partie.sync({ force: true })

  const partiesEnCours = parties.findAll({ attributes:['id_partie'] });
 */