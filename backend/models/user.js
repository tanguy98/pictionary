'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isCreator: DataTypes.BOOLEAN,
    id_partie: DataTypes.INTEGER,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.belongsTo(models.Partie, {
      foreignKey: {
        name: 'id_partie',
        allowNull: true
      }
    })
  };
  return User;
};