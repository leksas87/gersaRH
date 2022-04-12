'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const eventActionType = [
      {nameEventActionType: "Entrada"},
      {nameEventActionType: "Inicia Descanso"},
      {nameEventActionType: "Termina Descanso"},
      {nameEventActionType: "Salida"},
      {nameEventActionType: "EntradaTiempoExtra"},
      {nameEventActionType: "SalidaTiempoExtra"},
    ]

      await queryInterface.bulkInsert('EventActionType',eventActionType, {});

  },

  async down (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('Status', null, {});
    
  }
};
