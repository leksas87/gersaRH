'use strict';

const { Sequelize } = require('sequelize');
const {TIMEREQUEST_TABLE} = require('../models/timeRequest.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(TIMEREQUEST_TABLE,'fechaCreacion', Sequelize.STRING);
  },

  async down (queryInterface, Sequelize) {
   
  }
};
