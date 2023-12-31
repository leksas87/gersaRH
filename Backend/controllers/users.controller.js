﻿const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize');
const forbidden = require('middleware/forbidden');
const forbiddenJefeCuadrilla = require('middleware/forbiddenJC');
const userService = require('../services/user.service');
const employeeService = require('../services/employee.service');
const contractService = require('../services/contract.service');
const moment = require('moment-timezone');
const upload = require("../middleware/upload");
const readXlsxFile = require('read-excel-file/node');
const {models} = require('./../libs/sequelize');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register',authorize(),forbidden(), registerSchema, register);
router.post('/registerMaster', registerSchemaMaster, registerMaster);
router.get('/renew',authorize(),revalidadToken);
router.get('/', authorize(),forbiddenJefeCuadrilla(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/sendinvitation', getByEmployeeActive);
router.get('/:id', authorize(), getById);
router.patch('/:id', authorize(),forbidden(), updateSchema, update);
router.delete('/:id', authorize(),forbidden(), _delete);
router.get('/confirmation/:token',authenticateToken);
router.post('/confirmation',updateConfirmation);
router.post('/recuperacion', recovery);
router.get('/descargar/:id', download);
router.post('/registerFile/:sendInvitation',authorize(),upload.single("uploadfile"),registerFile);
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
    var dirname =`${__basedir}/storage/template/plantilla-empleados.xlsx`;//'storage/template/plantilla-empleados.xlsx'
    var fileName = "plantilla-empleados.xlsx"
    res.download(dirname,fileName, (error) => {
        error?console.log(error):console.log("Listo")
        });
}

async function registerFile(req, res) {
    const sendInvitation=req.params.sendInvitation;
    const usersNames = [];
    if(!req.file){
        return res.status(400).json({ message:'Error, seleccione un archivo'});
    }
    
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
                        fechaAltaImss:row[25],
                        numeroEmpleado:row[26],
                        tipoDeContrato:row[27],
                        puesto:row[28],
                        fechaDeInicio:row[29],
                        fechaDeFinalizacion:row[30],
                        horasLaborales:row[31],
                        unidadLaborales:row[32],
                        tipoSalario:row[33],
                        cantidadSalario:row[34],
                        schedule:row[35],
                        
                    };
                    if (usersNames.find(element=>element.username === user.username)) {
                        throw 'Error, se encontró un correo repetido';
                        
                    }
                    console.log(user.username, i);
                    let fechaNow = moment().tz("America/Mexico_City").format('YYYY-MM-DD');
                    if( user.phone === null ) { user.phone = ""; } 
                    if( user.tipoIdentificacion === null ) { user.tipoIdentificacion = ""; } 
                    if( user.documentoIdentidad === null ) { user.documentoIdentidad = ""; }
                    if( user.fechaNacimiento === null ) { user.fechaNacimiento = fechaNow; }
                    if( user.genero === null ) { user.genero = ""; }
                    if( user.nacionalidad === null ) { user.nacionalidad = ""; }             
                    if( user.lugarDeTrabajo === null ) { user.lugarDeTrabajo = ""; }
                    if( user.supervisor === null ) { throw 'Error, no se encontró un correo como supervisor'; }
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
                    if( user.fechaAltaImss === null ) { user.fechaAltaImss = fechaNow; }  
                    if( user.numeroEmpleado === null ) { user.numeroEmpleado = ''; } 
                    if( user.tipoDeContrato === null ) { user.tipoDeContrato = ''; } 
                    if( user.puesto === null ) { user.puesto = ''; } 
                    if( user.fechaDeInicio === null ) { user.fechaDeInicio = fechaNow; } 
                    if( user.horasLaborales === null ) { user.horasLaborales = 0; }
                    if( user.unidadLaborales === null ) { user.unidadLaborales = ""; }
                    if( user.tipoSalario === null ) { user.tipoSalario = ""; }
                    if( user.cantidadSalario === null ) { user.cantidadSalario = 0; }
                    usersNames.push(user);
                }
                
                          
            });
            rows.shift();
        })
    } catch (error) {
        if (error==='Error, se encontró un correo repetido') {
            return res.status(400).json({ message:'Error, se encontró un correo repetido',ok:false})
        }    
        if (error==='Error, no se encontró un correo como supervisor') {
            return res.status(400).json({ message:'Error, no se encontró un correo como supervisor',ok:false})
        } 
    }

    try {

        for (const userF of usersNames) {
            //Verifica si tiene que crear o actualizar el usuario
            let superVisor = await models.User.findOne({where : {username: userF.supervisor}});
            if (await models.User.findOne({ where: { username: userF.username } })) {
                let user = await models.User.findOne({ where: { username: userF.username } });
                user.firstName = userF.firstName;
                user.lastName = userF.lastName;
                user.phone = userF.phone;

                let employee = await models.Employee.findOne({where:{userId:user.id}});
                employee.tipoIdentificacion = userF.tipoIdentificacion;
                employee.documentoIdentidad = userF.documentoIdentidad;
                employee.fechaNacimiento = userF.fechaNacimiento;
                employee.genero = userF.genero;
                employee.nacionalidad = userF.nacionalidad;
                employee.lugarDeTrabajo = userF.lugarDeTrabajo;
                employee.supervisor = (superVisor === null || superVisor === undefined)?"0":superVisor.id.toString();
                employee.numeroCuentaBancaria = userF.numeroCuentaBancaria.toString();
                employee.swiftBic = userF.swiftBic;
                employee.frecuenciaPago = userF.frecuenciaPago;
                employee.direccion1 = userF.direccion1;
                employee.direccion2 = userF.direccion2;
                employee.ciudad = userF.ciudad;
                employee.codigoPostal = userF.codigoPostal;
                employee.estadoProvincia = userF.estadoProvincia;
                employee.pais = userF.pais;
                employee.emergenciaNombre = userF.emergenciaNombre;
                employee.empergenciaTelefono = userF.empergenciaTelefono;
                employee.rfc = userF.rfc;
                employee.numeroImms = userF.numeroImms;
                employee.curp = userF.curp;
                employee.fechaAltaImss = userF.fechaAltaImss;
                employee.numeroEmpleado = userF.numeroEmpleado;

                const contracts = await models.Contract.findAll();
                contracts.forEach(async contract => {
                    if(contract.userId === user.id && contract.isContractActivide ){
                        contract.tipoDeContrato = userF.tipoDeContrato;
                        contract.puesto = userF.puesto;
                        contract.fechaDeInicio = userF.fechaDeInicio;
                        contract.fechaDeFinalizacion = userF.fechaDeFinalizacion;
                        contract.horasLaborales = userF.horasLaborales;
                        contract.unidadLaborales = userF.unidadLaborales;
                        contract.tipoSalario = userF.tipoSalario;
                        contract.cantidadSalario = userF.cantidadSalario;
                        await contract.save();
                    }
                 });

                 const employeeSchedules = await models.EmployeeSchedule.findAll();
                 employeeSchedules.forEach(async employeeScheduleC => {
                    if(employeeScheduleC.employeeId === employee.id ){
                        await employeeScheduleC.destroy();
                    }
                 });
                //Revisar error post 
                let schedule = await models.Schedule.findOne({where:{scheduleName:userF.schedule}});
                if(schedule != null || schedule != undefined){
                   const relacion = await models.EmployeeSchedule.create({
                        employeeId: employee.id,
                        scheduleId: schedule.id
                    });
                    relacion.save();
                }
                
                
                user.save();
                employee.save();
            }else{
                userF.accessCode = await employeeService.validacionNumeroAleatorio();
                userF.rollTypeId = 2;
                
                    ///inicia proceso de guardado,verificamos si se mandara la invitacion
                if (sendInvitation==='send') {
                    await userService.sendInvitation(userF);
                } 
                const user = await models.User.create(userF);
                const employee = await models.Employee.create({
                    userId: user.id,
                    tipoIdentificacion:userF.tipoIdentificacion,
                    documentoIdentidad:userF.documentoIdentidad,
                    fechaNacimiento:userF.fechaNacimiento,
                    genero:userF.genero,
                    nacionalidad:userF.nacionalidad,
                    lugarDeTrabajo:userF.lugarDeTrabajo,
                    supervisor:(superVisor === null || superVisor === undefined)?"0":superVisor.id.toString(),
                    numeroCuentaBancaria:userF.numeroCuentaBancaria.toString(),
                    swiftBic:userF.swiftBic,
                    frecuenciaPago:userF.frecuenciaPago,
                    direccion1:userF.direccion1,
                    direccion2:userF.direccion2,
                    ciudad:userF.ciudad,
                    codigoPostal:userF.codigoPostal,
                    estadoProvincia:userF.estadoProvincia,
                    pais:userF.pais,
                    emergenciaNombre:userF.emergenciaNombre,
                    empergenciaTelefono:userF.empergenciaTelefono,
                    rfc:userF.rfc,
                    numeroImms:userF.numeroImms,
                    curp:userF.curp,
                    fechaAltaImss:userF.fechaAltaImss,
                    accessCode: userF.accessCode,
                    numeroEmpleado: userF.numeroEmpleado
                });
                await contractService.create({
                    userId: employee.id,
                    tipoDeContrato:userF.tipoDeContrato,
                    puesto:userF.puesto,
                    fechaDeInicio:userF.fechaDeInicio,
                    fechaDeFinalizacion:userF.fechaDeFinalizacion,
                    horasLaborales:userF.horasLaborales,
                    unidadLaborales:userF.unidadLaborales,
                    tipoSalario:userF.tipoSalario,
                    cantidadSalario:userF.cantidadSalario
                });
                let schedule = await models.Schedule.findOne({where:{scheduleName:userF.schedule}});
                if(schedule != null || schedule != undefined){
                    await models.EmployeeSchedule.create({
                        employeeId: employee.id,
                        scheduleId: schedule.id
                    });}
            }
            
        }

        console.log('Proceso de validacion de usuario no repetido en la base de datos finalizado!!!!');
        
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
        rollTypeId:Joi.number().required(),
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
    userService.getAll(req, res)
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
        isEmployeeActive:Joi.boolean(),
        rollTypeId:Joi.number()
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