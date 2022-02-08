const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {models} = require('./../libs/sequelize');

module.exports = {
   
    create,
    getEmployeeById
};

async function create(params) {
     await models.Employee.create(params);
}

async function getEmployeeById(id) {
    const employee = await models.Employee.findOne({where:{userId:id}});
    
    if ( !employee)  throw 'Empleado no encontrado';

    return employee;
}