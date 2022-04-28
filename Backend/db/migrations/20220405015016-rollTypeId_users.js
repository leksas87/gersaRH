'use strict';

const sequelize = require('../../libs/sequelize');
const {USER_TABLE,UserSchema}=require('../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(USER_TABLE,'rollTypeId','INTEGER');
  },

  down: async (queryInterface) => {
    // await queryInterface.dropTable(ROLLTYPE_TABLE);
  }
};
