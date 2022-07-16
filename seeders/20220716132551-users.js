'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [
      {
        name: 'João',
        email: 'joão.xp@teste.com',
        password: 'euEstiveAqui',
        saldo: 5000.40
      },
      {
        name: 'Maria',
        email: 'maria.xp@teste.com',
        password: 'euEstiveAquiTambem',
        saldo: 100.90
      },
      {
        name: 'Guilherme',
        email: 'guilherme.xp@teste.com',
        password: 'euNaoEstiveAqui',
        saldo: 900.10
      },
      {
        name: 'Marcia',
        email: 'marcia.xp@teste.com',
        password: 'professoraPort',
        saldo: 10000.40
      },
    ], {});
    },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
    
  }
};
