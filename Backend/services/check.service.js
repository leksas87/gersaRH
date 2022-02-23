const {models} = require('../libs/sequelize');


module.exports = {
   
    create,
    review
};

async function create(params) {
    await models.Check.create(params);
}

async function review(params) {
    console.log(params.accessCode);
    // await models.Check.findOne()
}