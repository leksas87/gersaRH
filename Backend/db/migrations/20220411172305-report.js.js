'use strict';

const {
	REPORTS_TABLE,
	ReportSchema,
} = require('../models/report.model');

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.createTable(REPORTS_TABLE, ReportSchema);
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable(REPORTS_TABLE);
	},
};