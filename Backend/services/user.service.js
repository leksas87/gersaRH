﻿const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {models} = require('./../libs/sequelize');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    createMaster,
    update,
    delete: _delete,
    reenvioToken,
    getByToken,
    updateConfirmation,
};

async function authenticate({ username, password }) {
    const user = await models.User.findOne({ where: { username } });

    if (user.active != true)       
          throw "Cuenta inactiva, favor de verificar su email";


    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'Usuario o contraseña incorrecta';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '2h' });
    return { ...omitHash(user.get()), token };
}

async function reenvioToken({ username, password }) {
    const user = await models.User.scope('withHash').findOne({ where: { username } });

    if (!user )
        throw 'Usuario o contraseña incorrecta';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '2h' });
    return { ...omitHash(user.get()), token };
}

async function getAll() {
    return await models.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function getByToken(token) {
    return await getUserToken(token);
}

async function create(params) {
    // validate
    if (await models.User.findOne({ where: { username: params.username } })) {
        throw 'El Usuario "' + params.username + '" ya existe en el sistema';
    }

    const token = jwt.sign({email: params.username}, config.secret);

    params.confirmationCode=token;

    const sgMail = require('@sendgrid/mail');

    const API_KEY=process.env.SENDGRID_API_KEY

    const URL=process.env.URL
    
    try {
        sgMail.setApiKey(API_KEY)
        const url=URL+params.confirmationCode;
        console.log(url);
        const msg = {
            to: params.username,
            from: {email:process.env.EMAIL,name:process.env.NAME,},
            subject:'Confirmación de registro',
            templateId: process.env.TEMPLETE,
            dynamic_template_data: {
                url: url,
            },
  
        };
        await sgMail.send(msg);
        // save user
        await models.User.create(params);
    } catch (error) {
        console.log(error.message);
    }
    
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