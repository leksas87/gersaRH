'use strict';

const {SCHEDULE_TABLE,ScheduleSchema}=require('../models/schedule.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn(SCHEDULE_TABLE,'tiempoActaAdministrativa');
  },

  down: async (queryInterface) => {
    // await queryInterface.dropTable(SCHEDULE_TABLE);
  }
};