'use strict';
module.exports = (sequelize, DataTypes) => {
  const Partie = sequelize.define('Partie', {
    id_partie: DataTypes.INTEGER,
    titre: DataTypes.STRING
  }, {});
  Partie.associate = function(models) {
    // associations can be defined here
    models.Partie.hasMany(models.Message)
  };
  return Partie;
};