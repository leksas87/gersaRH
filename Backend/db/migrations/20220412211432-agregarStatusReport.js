'use strict';

const { Sequelize } = require('sequelize');
const { REPORTS_TABLE } = require('../models/report.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(REPORTS_TABLE,'statusId', Sequelize.INTEGER);
  },

  async down (queryInterface, Sequelize) {
   
  }
};
