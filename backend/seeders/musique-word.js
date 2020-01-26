'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Words', [{
        word: "musique"
      }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Words', null, {});
  }
};
