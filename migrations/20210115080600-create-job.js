'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      phones: {
        type: Sequelize.STRING
      },
      emails: {
        type: Sequelize.STRING
      },
      timezone: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      method: {
        type: Sequelize.STRING
      },
      request_interval_seconds: {
        type: Sequelize.INTEGER
      },
      tolerated_failures: {
        type: Sequelize.INTEGER
      },
      created: {
        type: Sequelize.DATE
      },
      updated: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Jobs');
  }
};