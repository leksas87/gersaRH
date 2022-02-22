const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {models} = require('./../libs/sequelize');

module.exports = {
   
    create,
    getEmployeeById,
    update
};

async function update(id, params) {
    const employee = await getEmployeeById(id);

    // validate
    if ( !employee)  throw 'Empleado no encontrado';

    // copy params to user and save
    Object.assign(employee, params);
    await employee.save();

    return employee;
}

async function create(params) {
    const maximo=9999;
    const minimo=1000
    var num =  Math.floor(Math.random() * ((maximo+1) - minimo) + minimo);
    console.log(num);
    const accessCode=await models.Employee.findOne({where:{accessCode:num}});
    if (! accessCode) {
        console.log('no se encontro');
        params.accessCode=num;
        await models.Employee.create(params);
    }
    else{
        console.log('se encontro el mismo numero');
    }
    
     //await models.Employee.create(params);
     ///numero 4 digitos para el checkin
}

async function getEmployeeById(id) {
    const employee = await models.Employee.findOne({where:{userId:id}});
    
    if ( !employee)  throw 'Empleado no encontrado';

    return employee;
}