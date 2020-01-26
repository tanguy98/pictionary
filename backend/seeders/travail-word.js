'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Words', [{
        word: "travail"
      }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Words', null, {});
  }
};
