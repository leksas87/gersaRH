'use strict';

const {SCHEDULE_TABLE,ScheduleSchema}=require('../models/schedule.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(SCHEDULE_TABLE,ScheduleSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(SCHEDULE_TABLE);
  }
};