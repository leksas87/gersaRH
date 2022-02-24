const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize')
const employeeService = require('../services/employee.service');

// routes
router.get('/checkIn',check);
router.get('/checkOut',checkOut);
router.post('/',authorize(),registerSchema, register);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);

module.exports = router;

function check(req,res,next) {
    employeeService.review(req.headers)
    .then(user => res.json({data:user ,accessCode:req.headers['accesscode'],message:'Completado con exito',ok:true}))
    .catch(next);
}

function checkOut(req,res,next) {
    employeeService.reviewOut(req.headers)
    .then(user => res.json({data:user ,accessCode:req.headers['accesscode'],message:'Completado con exito',ok:true}))
    .catch(next);
}

function update(req, res, next) {
    employeeService.update(req.params.id, req.body)
        .then(user => res.json({data:user ,message:'Succesful',ok:true}))
        .catch(next);
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

