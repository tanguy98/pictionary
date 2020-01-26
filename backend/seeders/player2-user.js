'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'player2',
      password:"$2b$05$9PMuo4./0o3AfqcqX2AqmO1iTSmcPLGiyl1bZYDNxRAOFhT/lz0/K",
      isAdmin: 0,
      isCreator: 0,
      id_partie: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});S
},

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
