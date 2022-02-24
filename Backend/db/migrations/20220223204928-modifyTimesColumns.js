'use strict';
const {CHECK_TABLE,CheckSchema}=require('../models/check.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(CHECK_TABLE, 'dateCheckIn', CheckSchema.dateCheckIn);
    await queryInterface.addColumn(CHECK_TABLE, 'dateCheckOut', CheckSchema.dateCheckOut);
    await queryInterface.removeColumn(CHECK_TABLE, 'dateCheck');
    await queryInterface.removeColumn(CHECK_TABLE, 'initHour');
    await queryInterface.removeColumn(CHECK_TABLE, 'endHour');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
