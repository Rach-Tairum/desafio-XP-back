'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      saldo: {
        type: Sequelize.DOUBLE
      }
      
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};