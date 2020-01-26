'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Words', [{
        word: "environnement"
      }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Words', null, {});
  }
};
