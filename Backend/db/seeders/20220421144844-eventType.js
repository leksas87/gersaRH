'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const eventType = [
      {nameType: "Normal"},
      {nameType: "Retardo"},
      {nameType: "Acta Administartiva"}
    ]

      await queryInterface.bulkInsert('EventType',eventType, {});

  },

  async down (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('Status', null, {});
    
  }
};
