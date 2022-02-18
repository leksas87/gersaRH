const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize')
const contractService = require('../services/contract.service');

// routes
router.post('/', authorize() ,registerSchema, register);
router.patch('/:id', authorize(), updateSchema, update);
router.put('/:id', authorize(), updateSchemaPut, update);
router.get('/:id', authorize(), getByEmployee);

module.exports = router;


function getByEmployee(req,res,next) {
    contractService.getByEmployee(req.params.id)
        .then(contracts => res.json({data:contracts ,message:'Succesful',ok:true}))
        .catch(next);
}

function updateSchemaPut(req, res, next) {
    const schema = Joi.object({
        puesto: Joi.string().required(),
        fechaDeInicio: Joi.date().required(),
        fechaDeFinalizacion: Joi.date().required(),
        horasLaborales: Joi.number().integer().required(),
        unidadLaborales: Joi.string().required(),
        lunes: Joi.boolean().required(),
        martes: Joi.boolean().required(),
        miercoles: Joi.boolean().required(),
        jueves: Joi.boolean().required(),
        viernes: Joi.boolean().required(),
        sabado: Joi.boolean().required(),
        domingo: Joi.boolean().required(),
        tipoSalario: Joi.string().required(),
        cantidadSalario: Joi.number().integer().required(),
        isContractActivide: Joi.boolean().required()
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    contractService.update(req.params.id, req.body)
        .then(contract => res.json({data:contract ,message:'Succesful',ok:true}))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        puesto: Joi.string(),
        fechaDeInicio: Joi.date(),
        fechaDeFinalizacion: Joi.date(),
        horasLaborales: Joi.number().integer(),
        unidadLaborales: Joi.string(),
        lunes: Joi.boolean(),
        martes: Joi.boolean(),
        miercoles: Joi.boolean(),
        jueves: Joi.boolean(),
        viernes: Joi.boolean(),
        sabado: Joi.boolean(),
        domingo: Joi.boolean(),
        tipoSalario: Joi.string(),
        cantidadSalario: Joi.number().integer(),
        isContractActivide: Joi.boolean()
    });
    validateRequest(req, next, schema);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        userId: Joi.number().integer().required(),
        puesto: Joi.string().required(),
        fechaDeInicio: Joi.date().required(),
        fechaDeFinalizacion: Joi.date().required(),
        horasLaborales: Joi.number().integer().required(),
        unidadLaborales: Joi.string().required(),
        lunes: Joi.boolean().required(),
        martes: Joi.boolean().required(),
        miercoles: Joi.boolean().required(),
        jueves: Joi.boolean().required(),
        viernes: Joi.boolean().required(),
        sabado: Joi.boolean().required(),
        domingo: Joi.boolean().required(),
        tipoSalario: Joi.string().required(),
        cantidadSalario: Joi.number().integer().required(),
        isContractActivide: Joi.boolean().required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    contractService.create(req.body)
        .then(() => res.json({ message: 'Registro exitoso' ,ok:true}))
        .catch(next);
}

