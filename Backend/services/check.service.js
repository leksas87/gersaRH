const { date } = require('joi');
const {models} = require('../libs/sequelize');
const { Op } = require("sequelize");

module.exports = {
    create
};

async function create(params) {
    await models.Check.create(params);
}

