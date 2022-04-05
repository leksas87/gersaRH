'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const RequestType = [
      {nameRequestType: "vacaciones"},
      {nameRequestType: "incapacidad"},
      {nameRequestType: "diadefalta"},
    ]

      await queryInterface.bulkInsert('RequestType',RequestType, {});

  },

  async down (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('Status', null, {});
    
  }
};
