'use strict';

// les mots de passes stockés sont hashés salés par bcrypted (5 rounds)

module.exports = {
  
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password:'$2y$05$2wJXae9g62FSzX10nHdbneqFnHar0NAzrBexJGE36Nsi4B6ltTiqG', //passwordadmin
        isAdmin: 1,
        isCreator: 0,
        id_partie: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'player1',
        password:"$2y$05$SYFsIsVO.7nFpP0rFAWgm.7Ao5niDjr5BJkdEfs1qOtvNf.bQyK3K", //password1
        isAdmin: 0,
        isCreator: 0,
        id_partie: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'player2',
        password:"$2y$05$DrgGXpW3NXJAjo.3B0fvReNHAxUZFNHgWyVdfUeTmaK51fsZkeMXC", //password2
        isAdmin: 0,
        isCreator: 0,
        id_partie: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'player3',
        password:"$2y$05$JSTJBI18NJt9KJS2zsBgOOFYq3TRgcVUBhcUMrjTg0HclZ5bX21Ni", //password3
        isAdmin: 0,
        isCreator: 0,
        id_partie: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'player4',
        password:"$2y$05$fUQ4S9iaR.l7hpcdQHIT3.SwszS3IVtMT7HZQjT5KIAFBDL6UsETC", //password4
        isAdmin: 0,
        isCreator: 0,
        id_partie: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
