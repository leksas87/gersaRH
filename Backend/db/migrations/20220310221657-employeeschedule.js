'use strict';

const {EMPLOYEESCHEDULE_TABLE,EmployeeScheduleSchema}=require('../models/employeeSchedule.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(EMPLOYEESCHEDULE_TABLE,EmployeeScheduleSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(EMPLOYEESCHEDULE_TABLE);
  }
};