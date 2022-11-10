'use strict';

const { Sequelize } = require('sequelize');
const { AVAILABLEDAYS_TABLE, AvailableDaysSchema } = require('../models/availableDays.model');

module.exports = {
	up: async (queryInterface) => {
		//await queryInterface.removeColumn(AVAILABLEDAYS_TABLE,'status');
	},

	down: async (queryInterface) => {
		// await queryInterface.dropTable(EMPLOYEE_TABLE);
	},
};
