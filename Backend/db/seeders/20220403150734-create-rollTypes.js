'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const rolltype = [
      {nameRollType: "AdministradorRH"},
      {nameRollType: "Empleado"},
      {nameRollType: "Jefe de cuadrilla"}
    ]

      await queryInterface.bulkInsert('rolltype',rolltype, {});

  },

  async down (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('rolltype', null, {});
    
  }
};
