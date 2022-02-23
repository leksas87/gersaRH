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

async function validacionNumeroAleatorio() {
    const maximo=9999;
    const minimo=1000
    let numeroLibre=true;

    do {
        var num =  Math.floor(Math.random() * ((maximo+1) - minimo) + minimo);

        const accessCode=await models.Employee.findOne({where:{accessCode:num}});

        if (accessCode) {
            numeroLibre=false;
        }
    } while (!numeroLibre);

    return num;
}

async function create(params) {
    
    params.accessCode=await validacionNumeroAleatorio();
    await models.Employee.create(params);

}

async function getEmployeeById(id) {
    const employee = await models.Employee.findOne({where:{userId:id}});
    
    if ( !employee)  throw 'Empleado no encontrado';

    return employee;
}