const { date } = require('joi');
const {models} = require('../libs/sequelize');
const { Op } = require("sequelize");

module.exports = { 
    getWorkPlaces
};

async function getWorkPlaces() {

    return await models.WorkPlace.findAll();
}




