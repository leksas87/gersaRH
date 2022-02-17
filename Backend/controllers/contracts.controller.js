const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize')
const contractService = require('../services/contract.service');

// routes
router.post('/register', authorize() ,registerSchema, register);

module.exports = router;


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

