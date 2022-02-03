const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize')
const userService = require('../services/user.service');
const upload = require("../middleware/upload");
const readXlsxFile = require('read-excel-file/node');
const {models} = require('./../libs/sequelize');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register',authorize(), registerSchema, register);
router.post('/registerMaster', registerSchemaMaster, registerMaster);
router.get('/renew',authorize(),revalidadToken);
router.get('/', getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
router.get('/confirmation/:token',authenticateToken);
router.post('/confirmation',updateConfirmation);
router.post('/recuperacion', recovery);
router.post('/registerFile',authorize(),upload.single("uploadfile"),registerFile);

module.exports = router;

async function registerFile(req, res) {
    // importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename); 
    const usersNames = [];
    const URL=`${__basedir}/uploads/${req.file.filename}`;

    try {
        await readXlsxFile(URL).then((rows) => {
        
            rows.forEach((row) => {
                let user = {
                    firstName: row[0],
                    lastName: row[1],
                    username: row[2],
                    phone: row[3],
                };
                
                if (usersNames.find(element=>element.username === user.username)) {
                    
                    throw 'Error, se encontró un correo repetido';
                    
                }
                
                usersNames.push(user);
                
                
            });
            rows.shift();
        })
    } catch (error) {
        if (error==='Error, se encontró un correo repetido') {
            return res.status(400).json({ message:'Error, se encontró un correo repetido',ok:false})
        }    
        
    }

    try {

        function validationUserName() {
            // return new Promise((resolve,reject)=>{
                // resolve(
                    usersNames.forEach(async(element,i) => {
                        try {
                            if(i!==0){
                                
                                if (await models.User.findOne({ where: { username: element.username } })) {
                                    throw `Error , usuario ${element.username} ya existe en la base de datos . Renglon:${i}`;
                                    return;
                                }
                                
                                console.log(i);
                            }
                        } catch (error) {
                            console.log(error);
                            return res.status(400).json({ message:error,ok:false})
                        }
                        
                        
                        // userService.create(element);
                    })
                    
                // );

                
            // })
            
            
        } 
        
        await validationUserName();
        
        
    } catch (error) {
        // if (error===msnError2) {
            console.log(error);
            return res.status(400).json({ message:error,ok:false})
        // } 
    }
    console.log('esto no se tiene que ver');
    // console.log(usersNames);
    //guardar usuario en base de datos

    
}

function recovery(req, res, next) {
    userService.recoveryByUserName(req.body)
        .then(user => res.json({ data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function updateConfirmation(req, res, next) {
    console.log(req.body);
    userService.updateConfirmation(req.body)
        .then(user => res.json({data:user ,message:'Succesful',ok:true}))
        .catch(next);
}


function authenticateToken(req, res, next) {
    console.log(req.params.token);
    userService.getByToken(req.params.token)
        .then(user => res.json({ data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json({ data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function revalidadToken(req, res, next) {
    userService.reenvioToken(req.user)
        .then(user => res.json({ data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        phone:Joi.string().required(),
        sendInvitation:Joi.boolean(),
        confirmationCode:Joi.string(),
    });
    validateRequest(req, next, schema);
}

function registerSchemaMaster(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        active:Joi.boolean().required(),
        password: Joi.string().required(),
        roll:Joi.number().required(),
        phone:Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registro exitoso' ,ok:true}))
        .catch(next);
}

function registerMaster(req, res, next) {
    userService.createMaster(req.body)
        .then(() => res.json({ message: 'Registro exitoso' ,ok:true}))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json({ data:users ,message:'Succesful',ok:true}))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json({ data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty(''),
        phone:Joi.string().empty(''),
        active:Joi.boolean(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json({data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'Usuario eliminado exitosamente' ,ok:true}))
        .catch(next);
}