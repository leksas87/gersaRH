'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {

    const hashPre =  await bcrypt.hash("123456", 10);
    const userMaster = [
      {
        firstName: "Admin",
        lastName: "Master",
        username: "admin.master@gersa.com",
        hash: hashPre,
        active: true,
        rollTypeId:1,
        phone: "1234567890"
    }
    ]

      await queryInterface.bulkInsert('Users',userMaster, {});

  },

  async down (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('Users', null, {});
    
  }
};
