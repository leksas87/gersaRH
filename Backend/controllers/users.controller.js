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
router.get('/sendinvitation', getByEmployeeActive);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
router.get('/confirmation/:token',authenticateToken);
router.post('/confirmation',updateConfirmation);
router.post('/recuperacion', recovery);
router.get('/descargar/:id', download);
// router.post('/registerFile',authorize(),upload.single("uploadfile"),registerFile);
router.post('/registerFile/:sendInvitation',authorize(),upload.single("uploadfile"),registerFile);
//registerFile/sendInvitation
//registerFile/notSend

router.get('/sendinvitation/:username',authorize(), getByUserName);

module.exports = router;

function getByEmployeeActive(req,res,next) {
    userService.sendInvitationEmployeeActiveUserActive()
        .then(res.json({ message:'Envío exitoso',ok:true}))
        .catch(next);
}

function getByUserName(req, res, next) {
    userService.getByUserName(req.params)
        .then(user => res.json({ message:'Envío exitoso',ok:true}))
        .catch(next);
}

function download(req, res) {
    var dirname ='storage/template/plantilla-empleados.xlsx';
    var fileName = "plantilla-empleados.xlsx"
    res.download(dirname,fileName, (error) => {
        error?console.log(error):console.log("Listo")
        });
}

async function registerFile(req, res) {
    const sendInvitation=req.params.sendInvitation;
    const usersNames = [];
    const URL=`${__basedir}/uploads/${req.file.filename}`;

    try {
        await readXlsxFile(URL).then((rows) => {
        
            rows.forEach((row,i) => {
                if (i!==0) {
                    let user = {
                        firstName: row[0],
                        lastName: row[1],
                        username: row[2],
                        phone: row[3],
                        tipoIdentificacion:row[4],
                        documentoIdentidad:row[5],
                        fechaNacimiento:row[6],
                        genero:row[7],
                        nacionalidad:row[8],
                        lugarDeTrabajo:row[9],
                        supervisor:row[10],
                        numeroCuentaBancaria:row[11],
                        swiftBic:row[12],
                        frecuenciaPago:row[13],
                        direccion1:row[14],
                        direccion2:row[15],
                        ciudad:row[16],
                        codigoPostal:row[17],
                        estadoProvincia:row[18],
                        pais:row[19],
                        emergenciaNombre:row[20],
                        empergenciaTelefono:row[21],
                        rfc:row[22],
                        numeroImms:row[23],
                        curp:row[24],
                        fechaAltaImss:row[25]
                    };
                    if (usersNames.find(element=>element.username === user.username)) {
                    
                        throw 'Error, se encontró un correo repetido';
                        
                    }

                    if( user.tipoIdentificacion === null ) { user.tipoIdentificacion = ""; } 
                    if( user.documentoIdentidad === null ) { user.documentoIdentidad = ""; }
                    if( user.fechaNacimiento === null ) { user.fechaNacimiento = '2000-01/01'; }
                    if( user.genero === null ) { user.genero = ""; }
                    if( user.nacionalidad === null ) { user.nacionalidad = ""; }             
                    if( user.lugarDeTrabajo === null ) { user.lugarDeTrabajo = ""; }
                    if( user.supervisor === null ) { user.supervisor = ""; }
                    if( user.numeroCuentaBancaria === null ) { user.numeroCuentaBancaria = ""; }
                    if( user.swiftBic === null ) { user.swiftBic = ""; }
                    if( user.frecuenciaPago === null ) { user.frecuenciaPago = ""; }
                    if( user.direccion1 === null ) { user.direccion1 = ""; }
                    if( user.direccion2 === null ) { user.direccion2 = ""; }
                    if( user.ciudad === null ) { user.ciudad = ""; }
                    if( user.codigoPostal === null ) { user.codigoPostal = ""; }
                    if( user.estadoProvincia === null ) { user.estadoProvincia = ""; }
                    if( user.pais === null ) { user.pais = ""; }
                    if( user.emergenciaNombre === null ) { user.emergenciaNombre = ""; }
                    if( user.empergenciaTelefono === null ) { user.empergenciaTelefono = ""; }
                    if( user.rfc === null ) { user.rfc = ""; }
                    if( user.numeroImms === null ) { user.numeroImms = ""; }
                    if( user.curp === null ) { user.curp = ""; }
                    if( user.fechaAltaImss === null ) { user.fechaAltaImss = '2000-01/01'; }  
                                  
                    usersNames.push(user);
                }
                
                          
            });
            rows.shift();
        })
    } catch (error) {
        if (error==='Error, se encontró un correo repetido') {
            return res.status(400).json({ message:'Error, se encontró un correo repetido',ok:false})
        }    
        
    }

    try {

        for (const user of usersNames) {
            if (await models.User.findOne({ where: { username: user.username } })) {
                throw `Error , usuario ${user.username} ya existe en la base de datos . Renglon:`;
            }
            
        }

        console.log('Proceso de validacion de usuario no repetido en la base de datos finalizado!!!!');
        
    } catch (error) {
        
        console.log(error);
        return res.status(400).json({ message:error,ok:false})
        
    }
    try {
        for (const user of usersNames) {
            ///inicia proceso de guardado,verificamos si se mandara la invitacion
            if (sendInvitation==='send') {
                console.log(sendInvitation,'se mandaran las invitaciones');
                await userService.sendInvitation(user);
            } else if(sendInvitation==='donotsend'){
                console.log(sendInvitation,'no se mandaran las invitaciones');
            }
            // await models.User.create(user);
            const employee = await models.User.create(user);
            await models.Employee.create({
                userId: employee.id,
                tipoIdentificacion:user.tipoIdentificacion,
                documentoIdentidad:user.documentoIdentidad,
                fechaNacimiento:user.fechaNacimiento,
                genero:user.genero,
                nacionalidad:user.nacionalidad,
                lugarDeTrabajo:user.lugarDeTrabajo,
                supervisor:user.supervisor,
                numeroCuentaBancaria:user.numeroCuentaBancaria,
                swiftBic:user.swiftBic,
                frecuenciaPago:user.frecuenciaPago,
                direccion1:user.direccion1,
                direccion2:user.direccion2,
                ciudad:user.ciudad,
                codigoPostal:user.codigoPostal,
                estadoProvincia:user.estadoProvincia,
                pais:user.pais,
                emergenciaNombre:user.emergenciaNombre,
                empergenciaTelefono:user.empergenciaTelefono,
                rfc:user.rfc,
                numeroImms:user.numeroImms,
                curp:user.curp,
                fechaAltaImss:user.fechaAltaImss,
            })
            console.log('guardando al usuario',user.username);
            
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message:error,ok:false})
    }
    return res.status(200).json({ message:'Usuarios almacenados correctamente en la base de datos',ok:true})

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
        roll:Joi.number(),
        isEmployeeActive:Joi.boolean()
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