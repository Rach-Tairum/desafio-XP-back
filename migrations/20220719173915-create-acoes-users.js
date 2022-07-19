'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AcoesUsers', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: "Users",
          key: 'id'
        }
      },
      acaoId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: "TabelaAcoes",
          key: 'id'
        }
      },
      qtdAcoesCompradas: {
        type: Sequelize.INTEGER
      },
      valorTotalCompra: {
        type: Sequelize.DOUBLE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AcoesUsers');
  }
};