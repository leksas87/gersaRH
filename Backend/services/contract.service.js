const {models} = require('./../libs/sequelize');


module.exports = {
   
    create
};

async function create(params) {
    await models.Contract.create(params);
}