'use strict';

const { Sequelize } = require('sequelize');
const { EVENT_TABLE, EventSchema } = require('../models/event.model');

module.exports = {
	up: async (queryInterface) => {
		 await queryInterface.addColumn(EVENT_TABLE,'url',Sequelize.STRING);
	},
	down: async (queryInterface) => {
		 await queryInterface.dropTable(EVENT_TABLE);
	},
};
