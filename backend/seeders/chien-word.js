'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Words', [{
        word: "chien"
      }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Words', null, {});
  }
};
