'use strict';
const {CHECK_TABLE,CheckSchema}=require('../models/check.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(CHECK_TABLE, 'dateCheckIn');
    await queryInterface.removeColumn(CHECK_TABLE, 'dateCheckOut');
    await queryInterface.removeColumn(CHECK_TABLE, 'longitudeCheckIn');
    await queryInterface.removeColumn(CHECK_TABLE, 'longitudeCheckOut');
    await queryInterface.removeColumn(CHECK_TABLE, 'latitudeCheckIn');
    await queryInterface.removeColumn(CHECK_TABLE, 'latitudeCheckOut');
    await queryInterface.addColumn(CHECK_TABLE, 'DateCheck', CheckSchema.DateCheck);
    await queryInterface.addColumn(CHECK_TABLE, 'latitudeCheck', CheckSchema.latitudeCheck);
    await queryInterface.addColumn(CHECK_TABLE, 'longitudeCheck', CheckSchema.longitudeCheck);
    await queryInterface.addColumn(CHECK_TABLE, 'tipoCheck', CheckSchema.tipoCheck);
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
