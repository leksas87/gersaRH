const { date } = require('joi');
const {models} = require('../libs/sequelize');
const { Op } = require("sequelize");
const moment = require('moment-timezone');

module.exports = {
    create
};

/*async function create(params) {
    await models.Check.create(params);
}*/

async function create(params, res) {
    params.fechaCreacion = moment().tz("America/Mexico_City").format('YYYY-MM-DD');

    try {
        await models.File.create(params);
    } catch (error) {
        console.log(error.message);
    }
    
}