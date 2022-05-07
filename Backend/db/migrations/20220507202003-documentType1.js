'use strict';

const { Sequelize } = require('sequelize');
const {
	DOCUMENTTYPE_TABLE,
	DocumentTypeSchema,
} = require('../models/documentType.model');


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(DOCUMENTTYPE_TABLE,DocumentTypeSchema);
  },

  down: async (queryInterface) => {
     await queryInterface.dropTable(DOCUMENTTYPE_TABLE);
  }
};