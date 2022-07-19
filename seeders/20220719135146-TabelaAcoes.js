'use strict';
// Valores das ações de referência do dia 19/07/2022: https://br.investing.com/equities/
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('TabelaAcoes', [
      {
      nomeEmpresa: 'Alpargatas',
      qtdAcoes: 200,
      valorAcao: 18.78
      },
      {
        nomeEmpresa: 'Azul',
        qtdAcoes: 1000,
        valorAcao: 12.50
      },
      {
        nomeEmpresa: 'Braskem',
        qtdAcoes: 80,
        valorAcao: 34.54
      },
      {
        nomeEmpresa: 'CPFL',
        qtdAcoes: 150,
        valorAcao: 31.76
      },
      {
        nomeEmpresa: 'Iguatemi',
        qtdAcoes: 350,
        valorAcao: 19.43
      },
      {
        nomeEmpresa: 'Santander',
        qtdAcoes: 800,
        valorAcao: 27.66
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('TabelaAcoes', null, {});
  }
};
