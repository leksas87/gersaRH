'use strict';

const { Sequelize } = require('sequelize');
const { EMPLOYEE_TABLE, EmployeeSchema } = require('../models/employee.model');

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.addColumn(EMPLOYEE_TABLE,'fechaIngreso',Sequelize.DATE);
	},

	down: async (queryInterface) => {
		await queryInterface.dropTable(EMPLOYEE_TABLE);
	},
};
