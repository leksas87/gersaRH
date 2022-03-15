'use strict';

const {EVENTTYPE_TABLE,EventTypeSchema}=require('../models/eventType.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(EVENTTYPE_TABLE,EventTypeSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(EVENTTYPE_TABLE);
  }
};
