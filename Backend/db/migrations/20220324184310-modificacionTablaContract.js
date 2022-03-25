'use strict';

const {CONTRACT_TABLE,ContractSchema}=require('../models/contract.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn(CONTRACT_TABLE,'lunes');
    await queryInterface.removeColumn(CONTRACT_TABLE,'martes');
    await queryInterface.removeColumn(CONTRACT_TABLE,'miercoles');
    await queryInterface.removeColumn(CONTRACT_TABLE,'jueves');
    await queryInterface.removeColumn(CONTRACT_TABLE,'viernes');
    await queryInterface.removeColumn(CONTRACT_TABLE,'sabado');
    await queryInterface.removeColumn(CONTRACT_TABLE,'domingo');
  },

  down: async (queryInterface) => {
    // await queryInterface.dropTable(SCHEDULE_TABLE);
  }
};
