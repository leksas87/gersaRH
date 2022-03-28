const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const validateRequestHeader = require('middleware/validate-request-header');
const validateRequestParams = require('middleware/validate-request-params');
const authorize = require('middleware/authorize')
const forbidden = require('middleware/forbidden')
const forbiddenGet = require('middleware/forbiddenGet')
const employeeService = require('../services/employee.service');
const contractService = require('../services/contract.service');
//const { forbidden } = require('joi');

// routes
router.get('/auth',registerAccessCodeSchema, sendInformationByAccessCode);
router.post('/check',registerAccessCodeSchema,registerCheckSchema,registerCheck);
router.get('/check',registerAccessCodeSchema,Check);
router.post('/',authorize(),registerSchema, register);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.get('/:id/accessCode', authorize(), sendAccessCodeById);
router.get('/:id/events', authorize(), forbiddenGet(), getEvents);
router.post('/:id/events', registerEventSchema, registerEvents);
router.get('/:id/schedule', authorize(), getSchedule);
router.delete('/employeeSchedule/:id', authorize(), forbidden(),deleteEmployeeSchedule,deleteSchedule);
router.post('/add-schedule',authorize(),forbidden() ,addScheduleSchema,registerSchedule);
router.post('/:id/contracts', authorize(), forbidden() ,registerSchemaContracts, registerContracts);
router.patch('/:id/contracts/:idContract', authorize(), forbidden(), updateSchemaContracts, updateContracts);
router.put('/:id/contracts/:idContract', authorize(), forbidden(), updateSchemaContractsPut, updateContracts);
router.delete('/:id/contracts/:idContract', authorize(), forbidden(), deleteByIdContracts);
router.get('/:id/contracts', authorize(), forbiddenGet(), getByEmployee);


module.exports = router;

function getByEmployee(req,res,next) {
    contractService.getByEmployee(req.params.id)
        .then(contracts => res.json({data:contracts ,message:'Succesful',ok:true}))
        .catch(next);
}

function deleteByIdContracts(req, res, next) {
    contractService.delete(req.params.idContract)
        .then(() => res.json({ message: 'Contrato eliminado exitosamente' ,ok:true}))
        .catch(next);
}

function updateSchemaContractsPut(req, res, next) {
    const schema = Joi.object({
        tipoDeContrato: Joi.string(),
        puesto: Joi.string().required(),
        fechaDeInicio: Joi.date().required(),
        fechaDeFinalizacion: Joi.date(),
        horasLaborales: Joi.number().integer().required(),
        unidadLaborales: Joi.string().required(),
        tipoSalario: Joi.string().required(),
        cantidadSalario: Joi.number().integer().required(),
        isContractActivide: Joi.boolean().required()
    });
    validateRequest(req, next, schema);
}

function updateContracts(req, res, next) {
    contractService.update(req.params.id, req.params.idContract, req.body)
        .then(contract => res.json({data:contract ,message:'Succesful',ok:true}))
        .catch(next);
}

function updateSchemaContracts(req, res, next) {
    const schema = Joi.object({
        tipoDeContrato: Joi.string(),
        puesto: Joi.string(),
        fechaDeInicio: Joi.date(),
        fechaDeFinalizacion: Joi.date(),
        horasLaborales: Joi.number().integer(),
        unidadLaborales: Joi.string(),
        tipoSalario: Joi.string(),
        cantidadSalario: Joi.number().integer(),
        isContractActivide: Joi.boolean()
    });
    validateRequest(req, next, schema);
}

function registerSchemaContracts(req, res, next) {
    //console.log(req.user);
    const schema = Joi.object({
        userId: Joi.number().integer().required(),
        tipoDeContrato: Joi.string().required(),
        puesto: Joi.string().required(),
        fechaDeInicio: Joi.date().required(),
        fechaDeFinalizacion: Joi.date(),
        horasLaborales: Joi.number().integer().required(),
        unidadLaborales: Joi.string().required(),
        tipoSalario: Joi.string().required(),
        cantidadSalario: Joi.number().integer().required()
    });
    validateRequest(req, next, schema);
}
function deleteEmployeeSchedule(req, res, next) {
    console.log(req.params.id);
    const schema = Joi.object({
        id: Joi.number().integer().required()
    });
    validateRequestParams(req, next, schema);
}
function registerContracts(req, res, next) {
    contractService.create(req.body, req.params.id)
        .then(() => res.json({ message: 'Registro exitoso' ,ok:true}))
        .catch(next);
}

function registerEvents(req,res,next) {
    employeeService.registerEvents(req.body, req.params.id)
        .then(res.json({ message:'Succesful',ok:true}))
        .catch(next);
}

function registerEventSchema(req,res,next){
    const schema = Joi.object({
        latitudeEvent: Joi.string().required(),
        longitudeEvent: Joi.string().required(),
        EventType: Joi.string().required()
    })
    validateRequest(req, next, schema);
}

function sendInformationByAccessCode(req,res,next) {
    employeeService.sendInformationByAccessCode(req)
    .then(user => res.json({data:user ,message:'Completado con exito',ok:true}))
    .catch(next);
}

function  getEvents(req, res, next) {
    employeeService.getEvents(req.params.id, req.query.startDate, req.query.endDate)
        .then(registros => res.json({ registros:registros ,message:'Succesful',ok:true}))
        .catch(next);
    }


function  sendAccessCodeById(req, res, next) {
    employeeService.sendAccessCode(req.params.id)
        .then(() => res.json({ message:'Succesful',ok:true}))
        .catch(next);
}

function registerAccessCodeSchema(req,res,next){
    console.log("paso");
    const schema = Joi.object({
        accesscode: Joi.number().integer().min(1000).max(9999).required(),
    });
    validateRequestHeader(req, next, schema);
}

function registerCheck(req,res,next) {
    employeeService.registerCheck(req.body)
        .then(res.json({ message:'Succesful',ok:true}))
        .catch(next);
}

function Check(req,res,next) {
    employeeService.reviewUser(req)
    .then(user => res.json({data:user ,message:'Completado con exito',ok:true}))
    .catch(next);
}


function update(req, res, next) {
    employeeService.update(req.params.id, req.body)
        .then(user => res.json({data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function registerCheckSchema(req,res,next){
    const schema = Joi.object({
        latitudeCheck: Joi.string().required(),
        longitudeCheck: Joi.string().required(),
        userId: Joi.number().integer().required(),
        username: Joi.string().required(),
        tipoCheck: Joi.string().required()
    })
    validateRequest(req, next, schema);
}
function addScheduleSchema(req,res,next){
    const schema = Joi.object({
        employeeId: Joi.number().integer().required(),
        scheduleId: Joi.number().integer().required()
    })
    validateRequest(req, next, schema);
}
function updateSchema(req, res, next) {
    const schema = Joi.object({
        tipoIdentificacion: Joi.string().empty(''),
        documentoIdentidad: Joi.string().empty(''),
        fechaNacimiento: Joi.date(),
        genero: Joi.string().empty(''),
        nacionalidad: Joi.string().empty(''),
        lugarDeTrabajo: Joi.string().empty(''),
        supervisor: Joi.string().empty(''),
        numeroCuentaBancaria: Joi.string().empty(''),
        swiftBic: Joi.string().empty(''),
        frecuenciaPago: Joi.string().empty(''),
        direccion1: Joi.string().empty(''),
        direccion2: Joi.string().empty(''),
        ciudad: Joi.string().empty(''),
        codigoPostal: Joi.string().empty(''),
        estadoProvincia: Joi.string().empty(''),
        pais: Joi.string().empty(''),
        emergenciaNombre: Joi.string().empty(''),
        empergenciaTelefono: Joi.string().empty(''),
        rfc: Joi.string().empty(''),
        numeroImms: Joi.string().empty(''),
        curp: Joi.string().empty(''),
        fechaAltaImss: Joi.date()
    });
    validateRequest(req, next, schema);
}

function getById(req, res, next) {
    employeeService.getEmployeeById(req.params.id)
        .then(user => res.json({ data:user ,message:'Succesful',ok:true}))
        .catch(next);
}
function getSchedule(req, res, next) {
    employeeService.getEmployeeScheduleById(req.params.id,res)
        .then(user => res.json({ data:user ,message:'Succesful'}))
        .catch(next);
}
function deleteSchedule(req, res, next) {
    console.log(req.params.id);
    employeeService.deleteEmployeeScheduleById(req.params.id,res)
        .then(user => res.json({ message:'Horario eliminado correctamente'}))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        userId: Joi.number().integer().required(),
        fechaNacimiento:Joi.date().required(),
        frecuenciaPago:Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    employeeService.create(req.body)
        .then(() => res.json({ message: 'Registro exitoso' ,ok:true}))
        .catch(next);
}
function registerSchedule(req, res, next) {
    employeeService.createSchedule(req.body)
        .then(() => res.json({ message: 'Registro exitoso' }))
        .catch(next);
}

