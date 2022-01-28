'use strict';

const {EMPLOYEE_TABLE,EmployeeSchema}=require('../models/employee.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(EMPLOYEE_TABLE,EmployeeSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(EMPLOYEE_TABLE);
  }
};
