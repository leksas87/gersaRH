'use strict';

const {PAYROLL_TABLE,PayrollSchema}=require('../models/payRoll.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PAYROLL_TABLE,PayrollSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PAYROLL_TABLE);
  }
};
