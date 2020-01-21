'use strict';
module.exports = (sequelize, DataTypes) => {
  const Partie = sequelize.define('Partie', {
  }, {});
  Partie.associate = function(models) {
    // associations can be defined here
    models.Partie.hasMany(models.User)
  };
  return Partie;
};