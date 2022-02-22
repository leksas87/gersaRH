'use strict';

const {EMPLOYEE_TABLE,EmployeeSchema}=require('../models/employee.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(EMPLOYEE_TABLE,'accessCode',EmployeeSchema.accessCode);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(EMPLOYEE_TABLE,'accessCode');
  }
};
