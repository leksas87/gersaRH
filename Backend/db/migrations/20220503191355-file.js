'use strict';

const { Sequelize } = require('sequelize');
const {
	FILE_TABLE,
	FileSchema,
} = require('../models/file.model');


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(FILE_TABLE,FileSchema);
  },

  down: async (queryInterface) => {
     await queryInterface.dropTable(FILE_TABLE);
  }
};