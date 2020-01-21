'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Words', [{
        word: "chien",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Words', null, {});
  }
};
