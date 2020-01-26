'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Words', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      word: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Words');
  }
};
