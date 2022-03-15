const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {models} = require('./../libs/sequelize');
const {Op,DataTypes}=require('sequelize');
const moment = require('moment-timezone');

module.exports = {
    create,
    getAll,
    delete: _delete,
    update,
    getById
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
    console.log(schedule);
    if (!schedule) throw 'Horario no encontrado';
    return schedule;
}

async function update(id, params) {
    const schedule = await getSchedule(id);
    // copy params to user and save
    Object.assign(schedule, params);
    await schedule.save();
    
    return schedule.get();
}

async function getById(id) {
    const schedule = await models.Schedule.findOne({ where: { id } });
    if (!schedule) throw 'Horario no encontrado';
    return schedule.get();
}