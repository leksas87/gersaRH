'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const status = [
      {nameStatus: "Pendiente"},
      {nameStatus: "Aceptado"},
      {nameStatus: "Rechazado"},
      {nameStatus: "Finalizado"},
    ]

      await queryInterface.bulkInsert('Status',status, {});

  },

  async down (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('Status', null, {});
    
  }
};
