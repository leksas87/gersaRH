'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const DocumentType = [
      {nombre: "Personal"},
      {nombre: "Empresa"}
    ]

      await queryInterface.bulkInsert('DocumentType',DocumentType, {});

  },

  async down (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('DocumentType', null, {});
    
  }
};
