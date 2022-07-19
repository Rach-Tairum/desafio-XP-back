'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('AcoesUsers', [
        {
        userId: 1,
        acaoId: 2,
        qtdAcoesCompradas: 100,
        valorTotalCompra: 1250.00
      },
      {
        userId: 1,
        acaoId: 6,
        qtdAcoesCompradas: 5,
        valorTotalCompra: 138.30
      },
      {
        userId: 2,
        acaoId: 1,
        qtdAcoesCompradas: 6,
        valorTotalCompra: 112.68
      },
      {
        userId: 3,
        acaoId: 3,
        qtdAcoesCompradas: 10,
        valorTotalCompra: 345.40
      },
      {
        userId: 4,
        acaoId: 5,
        qtdAcoesCompradas: 50,
        valorTotalCompra: 971.50
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AcoesUsers', null, {});
  }
};
