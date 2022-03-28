'use strict';

const {EVENT_TABLE,EventSchema}=require('../models/event.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.changeColumn(EVENT_TABLE,'DateEvent','VARCHAR(20)');
  },

  down: async (queryInterface) => {
    // await queryInterface.dropTable(EVENT_TABLE);
  }
};
