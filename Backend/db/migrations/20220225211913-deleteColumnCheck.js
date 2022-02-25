'use strict';
const {CHECK_TABLE,CheckSchema}=require('../models/check.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(CHECK_TABLE, 'longitude');
    await queryInterface.removeColumn(CHECK_TABLE, 'latitude');
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
