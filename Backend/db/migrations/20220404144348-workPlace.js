'use strict';

const {WORKPLACE_TABLE,WorkPlaceSchema}=require('../models/workPlace.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(WORKPLACE_TABLE,WorkPlaceSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(WORKPLACE_TABLE);
  }
};