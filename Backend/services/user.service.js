const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {models} = require('./../libs/sequelize');
const { func } = require('joi');

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
    recoveryByUserName,
    sendInvitation,
    getByUserName
};

async function authenticate({ username, password }) {
    const user = await models.User.findOne({ where: { username } });

    if(!user)
        throw 'Usuario o contraseña incorrecta';

    if (user.active != true)       
          throw "Cuenta inactiva, favor de verificar su email";


    if ( !(await bcrypt.compare(password, user.hash)))
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

async function getByUserName(params) {

    const user = await models.User.findOne({ where: { username: params.username } });
    if (!user) throw 'Usuario no encontrado';
    //return user;
    if(!user.isEmployeeActive) throw 'Este usuario no esta contratado';
    if(user.active) throw 'Usuario ya activado';

    try {
        await sendInvitation(params)
        user.confirmationCode = params.confirmationCode;
        await user.save();
    } catch (error) {
        
        console.log(error.message);
    }
}

async function getByToken(token) {
    return await getUserToken(token);
}

async function create(params) {

    if (await models.User.findOne({ where: { username: params.username } })) {
        throw 'El Usuario "' + params.username + '" ya existe en el sistema';
    }

    if(params.sendInvitation) {
            try {
                await sendInvitation(params)
            } catch (error) {
                console.log(error.message);
            }
    }
        
    try {
        // save user
        const user = await models.User.create(params);
        await models.Employee.create({
            userId: user.id
        })
    } catch (error) {
        console.log(error.message);
    }
    
}

async function sendInvitation(params) {
    const token = jwt.sign({email: params.username}, config.secret);

    params.confirmationCode=token;
    
    const sgMail = require('@sendgrid/mail');

    const API_KEY=process.env.SENDGRID_API_KEY;

    const URL=process.env.URL;

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

async function recoveryByUserName(params) {

    const user = await models.User.findOne({where:{username:params.username}});
    // validate
    if (!user) throw 'Usuario no encontrado';

    const token = jwt.sign({email: params.username}, config.secret);

    user.confirmationCode=token;

    const sgMail = require('@sendgrid/mail');

    const API_KEY=process.env.SENDGRID_API_KEY

    const URL=process.env.URLR
    
    try {
        sgMail.setApiKey(API_KEY)
        const url=URL+user.confirmationCode;
        console.log(url);
        const msg = {
            to: params.username,
            from: {email:process.env.EMAIL,name:process.env.NAME,},
            subject:'Recuperacion contraseña',
            templateId: process.env.TEMPLETER,
            dynamic_template_data: {
                url: url,
                nombre: user.firstName
            },
  
        };
        await sgMail.send(msg);
        // actualizar el user
        await user.save();
    } catch (error) {
        console.log(error.message);
    }
    
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