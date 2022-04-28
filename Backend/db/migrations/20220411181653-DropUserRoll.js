'use strict';

const {USER_TABLE,UserSchema}=require('../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE,'roll');
  },

  down: async (queryInterface) => {
    // await queryInterface.dropTable(EVENT_TABLE);
  }
};