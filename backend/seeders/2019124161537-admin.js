'use strict';
var bcryptedPassword = "$2b$05$9PMuo4./0o3AfqcqX2AqmO1iTSmcPLGiyl1bZYDNxRAOFhT/lz0/K"; // 5 rounds to code root123

module.exports = {
  
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [{
        email:'admin@admin.fr',
        username: 'admin',
        password:bcryptedPassword,
        isAdmin: 1,
        isCreator: 0,
        id_partie: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
