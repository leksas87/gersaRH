'use strict';

const {ROLLTYPE_TABLE,RollTypeSchema}=require('../models/rollType.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ROLLTYPE_TABLE,RollTypeSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ROLLTYPE_TABLE);
  }
};
