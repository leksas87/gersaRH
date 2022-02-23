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
        registroEntradaEmpleado=await models.Check.findOne({ where: {employeeid:employee.id,dateCheck:`${fechaActual}`,initHour:{[Op.ne]: `00:00:00`}}});
        if (registroEntradaEmpleado) {
            throw 'Ya existe una entrada registrada';
        } 
    }
    else
    {
        registroEntradaEmpleado=await models.Check.findOne({ where: {employeeid:employee.id,dateCheck:`${fechaActual}`,initHour:`00:00:00`}});
        if (registroEntradaEmpleado)
        {
            throw 'Aún no registras una entrada el día de hoy';
        }
        registroSalidaEmpleado=await models.Check.findOne({ where: {employeeid:employee.id,dateCheck:`${fechaActual}`,endHour:`00:00:00`}});

        if (!registroSalidaEmpleado) {
            throw 'Ya registraste tu salida el día de hoy'
        }
    }

}