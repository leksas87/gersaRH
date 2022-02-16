'use strict';

const {LOGBOOK_TABLE,LogbookSchema}=require('../models/logbook.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(LOGBOOK_TABLE,LogbookSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(LOGBOOK_TABLE);
  }
};
