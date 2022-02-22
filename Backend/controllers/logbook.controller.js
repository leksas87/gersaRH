const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize')
const logbookService = require('../services/logbook.service');

router.post('/:operacion',registerSchema, register);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        employeeId: Joi.number().integer().required(),
        longitude:Joi.string().required(),
        latitude:Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    console.log('aqui');
    logbookService.create(req.body)
        .then(() => res.json({ message: 'Registro exitoso' ,ok:true}))
        .catch(next);
}

