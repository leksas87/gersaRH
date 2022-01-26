'use strict';

const User=require('../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(User);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(User);
  }
};
