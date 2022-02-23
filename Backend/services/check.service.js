const { date } = require('joi');
const {models} = require('../libs/sequelize');
const { Op } = require("sequelize");

module.exports = {
   
    create,
    review
};

async function create(params) {
    await models.Check.create(params);
}

async function review(params) {
    
    const employee=await models.Employee.findOne({ where: { accessCode: params.accessCode } })
    const moment = require('moment');
    const m = moment();
    fechaActual=m.format('yyyy-MM-DD');

    if (!employee) {
        throw 'Empleado no localizado';
    } 

    if(params.isCheckInEntry=='true'){
        registroEmpleado=await models.Check.findOne({ where: {employeeid:employee.id,dateCheck:`${fechaActual}`}})
        if (registroEmpleado) {
            throw 'Ya existe una entrada registrada';
        } 
    }

}