'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  
   return queryInterface.bulkInsert('Jobs', [{
    status: 'Healthy 1min ago',
    name: 'Update content from Google',
    timezone: 'UTC',
    request_interval_seconds: 60,
    created: '2021-01-12T14:55:15+00:00',
    updated: '2021-01-12T14:55:15+00:00',
    tolerated_failures : 'false',
    createdAt : '2021-01-12T14:55:15+00:00',
    updatedAt : '2021-01-12T14:55:15+00:00'
    }, ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Jobs', null, {});
  }
};