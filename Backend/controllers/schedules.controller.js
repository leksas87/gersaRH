const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize')
const scheduleService = require('../services/schedule.service');
const moment = require('moment-timezone');
const {models} = require('./../libs/sequelize');

// routes
router.post('/', authorize(),authenticateSchema,register);

module.exports = router;

function register(req,res,next) {
    scheduleService.create(req.body)
        .then(()=> res.json({ message:'Registro exitoso!',ok:true}))
        .catch(next);
}

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        scheduleName: Joi.string().required(),
        horaEntrada: Joi.string().required(),
        horaSalida: Joi.string().required(),
        tiempoDescanso: Joi.number().required(),
        tiempoRetraso: Joi.number().required(),
        tiempoActaAdministrativa: Joi.number().required(),
        Lunes: Joi.boolean().required(),
        Martes: Joi.boolean().required(),
        Miercoles: Joi.boolean().required(),
        Jueves: Joi.boolean().required(),
        Viernes: Joi.boolean().required(),
        Sabado: Joi.boolean().required(),
        Domingo: Joi.boolean().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json({ data:user ,message:'Succesful'}))
        .catch(next);
}
