'use strict';

const {
	TIMEREQUEST_TABLE,
	TimeRequestSchema,
} = require('../models/timeRequest.model');

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.createTable(TIMEREQUEST_TABLE, TimeRequestSchema);
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable(TIMEREQUEST_TABLE);
	},
};
