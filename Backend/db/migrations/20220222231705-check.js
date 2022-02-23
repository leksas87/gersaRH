'use strict';

const {CHECK_TABLE,CheckSchema}=require('../models/check.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CHECK_TABLE,CheckSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(CHECK_TABLE);
  }
};
