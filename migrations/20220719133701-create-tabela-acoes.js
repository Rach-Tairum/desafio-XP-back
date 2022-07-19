'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TabelaAcoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeEmpresa: {
        type: Sequelize.STRING
      },
      qtdAcoes: {
        type: Sequelize.INTEGER
      },
      valorAcao: {
        type: Sequelize.DOUBLE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TabelaAcoes');
  }
};