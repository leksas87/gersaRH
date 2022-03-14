const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {models} = require('./../libs/sequelize');
const {Op,DataTypes}=require('sequelize');
const moment = require('moment-timezone');

module.exports = {
    create,
    getAll
};


async function create(params) {
    await models.Schedule.create(params);
}

async function getAll() {
    return await models.Schedule.findAll();
}