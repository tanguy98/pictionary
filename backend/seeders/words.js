'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Words', [
      {
        word: "chien",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        word: "amour",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        word: "musique",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        word: "chat",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        word: "travail",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        word: "animal",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        word: "environnement",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        word: "économie",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        word: "décision",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        word: "religion",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        word: "président",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        word: "éducation",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Words', null, {});
  }
};
