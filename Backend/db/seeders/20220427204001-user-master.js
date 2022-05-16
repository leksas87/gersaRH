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
      
      const user = await queryInterface.sequelize.query(
        `SELECT id from Users;`
      );
      const userRows = user[0];

      await queryInterface.bulkInsert('Contracts',[
        {fechaDeInicio: new Date(),  userId: userRows[0].id, isContractActivide: true}
      ], {});

    return await queryInterface.bulkInsert('Employees', [
      {fechanacimiento: new Date(),  userId: userRows[0].id,fechaIngreso: "2022-01-01"}
    ], {});

  },

  async down (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('Users', null, {});
    
  }
};
