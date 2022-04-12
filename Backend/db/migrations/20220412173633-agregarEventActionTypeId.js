'use strict';

const { Sequelize } = require('sequelize');
const { EVENT_TABLE} = require('../models/event.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(EVENT_TABLE,'eventActionTypeId', Sequelize.INTEGER);
  },

  async down (queryInterface, Sequelize) {
   
  }
};
