'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroCliente: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      numeroInstalacao: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      vencimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      valorAPagar: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      mesReferencia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      energiaEletricaKwh: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      energiaEletricaValor: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      energiaSCEESemICMSKwh: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      energiaSCEESemICMSValor: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      energiaCompensadaKwh: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      energiaCompensadaValor: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      cosip: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contas');
  }
};
