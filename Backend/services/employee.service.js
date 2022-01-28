const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {models} = require('./../libs/sequelize');

module.exports = {
   
    create,
    
};

async function create(params) {
     await models.Employee.create(params);
}