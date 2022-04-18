'use strict';

const { Sequelize } = require('sequelize');
const {
	REPORTS_TABLE,
	ReportSchema,
} = require('../models/report.model');


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(REPORTS_TABLE,'reportType',Sequelize.STRING);
  },

  down: async (queryInterface) => {
    // await queryInterface.dropTable(ROLLTYPE_TABLE);
  }
};
