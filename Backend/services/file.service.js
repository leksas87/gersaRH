const { date } = require('joi');
const {models} = require('../libs/sequelize');
const { Op } = require("sequelize");
const moment = require('moment-timezone');

module.exports = {
    create,
    update
};

async function getFile(id) {
    const file = await models.File.findByPk(id);
    if (!file) throw 'Archivo no encontrado';
    return file;
}

async function update( idFile, params) {
    const file = await getFile(idFile);

    if (!file) throw 'Archivo no encontrado'

    

    // copy params to user and save
    Object.assign(file, params);
    await file.save();

    return file.get();
}

async function create(params, res) {
    params.fechaCreacion = moment().tz("America/Mexico_City").format('YYYY-MM-DD');

    try {
        await models.File.create(params);
    } catch (error) {
        console.log(error.message);
    }
    
}