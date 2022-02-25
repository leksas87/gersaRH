'use strict';
const {CHECK_TABLE,CheckSchema}=require('../models/check.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(CHECK_TABLE, 'longitudeCheckIn', CheckSchema.longitudeCheckIn);
    await queryInterface.addColumn(CHECK_TABLE, 'latitudeCheckIn', CheckSchema.latitudeCheckIn);
    await queryInterface.addColumn(CHECK_TABLE, 'longitudeCheckOut', CheckSchema.longitudeCheckOut);
    await queryInterface.addColumn(CHECK_TABLE, 'latitudeCheckOut', CheckSchema.latitudeCheckOut);
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
