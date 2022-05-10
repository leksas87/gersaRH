const { date } = require('joi');
const {models} = require('../libs/sequelize');
const { Op } = require("sequelize");
const moment = require('moment-timezone');

module.exports = {
    update,
    getById,
    getAll
};

async function getAll() {
    return await models.Payroll.findAll();
}

async function getPayRoll(id) {
    const payRoll = await models.Payroll.findByPk(id);
    if (!payRoll) throw 'Archivo de nomina no encontrado';
    return payRoll;
}

async function update( idPayRoll, params) {
    const payRoll = await getPayRoll(idPayRoll);

    if (!payRoll) throw 'Archivo de nomina no encontrado'

    

    // copy params to user and save
    Object.assign(payRoll, params);
    await payRoll.save();

    return payRoll.get();
}

async function getById(id) {
    const payroll = await models.Payroll.findOne({ where: { 
                                                            employeeId: id
                                                         },
                                                         order:[['id', 'DESC']]
                                                });

    if(!payroll) throw 'Informacion de nomina no encontrado con ese ID o no existe ese usuario'
    return payroll;
}