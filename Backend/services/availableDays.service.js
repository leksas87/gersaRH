const { date } = require('joi');
const {models} = require('../libs/sequelize');
const { Op } = require("sequelize");
const moment = require('moment-timezone');

module.exports = {
    update
};

async function getAvailableDays(id) {
    const AvailableDays = await models.AvailableDays.findByPk(id);
    if (!AvailableDays) throw 'Archivo no encontrado';
    return AvailableDays;
}

async function update( idAvailableDays, params) {
    const AvailableDays = await getAvailableDays(idAvailableDays);

    if (!AvailableDays) throw 'Registro no encontrado'

    // copy params to user and save
    Object.assign(AvailableDays, params);
    await AvailableDays.save();

    return AvailableDays.get();
}