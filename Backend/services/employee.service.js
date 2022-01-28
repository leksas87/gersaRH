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

async function createMaster(params) {
    // validate
    if (await models.User.findOne({ where: { username: params.username } })) {
        throw 'El Usuario "' + params.username + '" ya existe en el sistema';
    }
    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }
    // save user
    await models.User.create(params);
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const usernameChanged = params.username && user.username !== params.username;
    if (usernameChanged && await models.User.findOne({ where: { username: params.username } })) {
        throw 'El Usuario "' + params.username + '" ya existe en el sistema';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function updateConfirmation( params ) {
    console.log(params)
    const user = await models.User.findOne({where:{username:params.username}});
    if (!user) throw 'Usuario no encontrado';

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
        params.active = true;
        params.confirmationCode = null;
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

async function getUser(id) {
    const user = await models.User.findByPk(id);
    if (!user) throw 'Usuario no encontrado';
    return user;
}

async function getUserToken(token) {
    const user = await models.User.findOne({where:{confirmationCode:token}});
    if (!user) throw 'Usuario no encontrado';
    return user;
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}

 async function reenvioToken(params) {
    const user = await models.User.findOne({ where: params});

    if (!user)
        throw 'Usuario no encontrado';

    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '2h' });
    return { ...omitHash(user.get()), token };
}