'use strict';

const {CONTRACT_TABLE,ContractSchema}=require('../models/contract.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CONTRACT_TABLE,ContractSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CONTRACT_TABLE);
  }
};
