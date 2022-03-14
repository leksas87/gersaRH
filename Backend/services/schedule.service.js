const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {models} = require('./../libs/sequelize');
const {Op,DataTypes}=require('sequelize');
const moment = require('moment-timezone');

module.exports = {
    create,
    getAll,
    delete: _delete
};


async function create(params) {
    await models.Schedule.create(params);
}

async function getAll() {
    return await models.Schedule.findAll();
}

async function _delete(id) {
    const schedule = await getSchedule(id);
    await schedule.destroy();
}

async function getSchedule(id) {
    const schedule = await models.Schedule.findByPk(id);
    if (!schedule) throw 'Horario no encontrado';
    return schedule;
}