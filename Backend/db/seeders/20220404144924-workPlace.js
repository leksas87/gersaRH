'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const workplaces = [
      {nameWorkPlace: "Tultitlan"},
      {nameWorkPlace: "Adidas"},
      {nameWorkPlace: "PH"},
      {nameWorkPlace: "Barrientos"},
      {nameWorkPlace: "Ingram"},
      {nameWorkPlace: "Argo"},
      {nameWorkPlace: "CControl"},
    ]

      await queryInterface.bulkInsert('workplace',workplaces, {});

  },

  async down (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('workplace', null, {});
    
  }
};
