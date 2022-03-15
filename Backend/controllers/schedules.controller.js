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
router.get('/',authorize(),getAll);
router.delete('/:id', authorize(), deleteSchedule);

module.exports = router;

function deleteSchedule(req, res, next) {
    scheduleService.delete(req.params.id)
        .then(() => res.json({ message: 'Horario eliminado exitosamente'}))
        .catch(next);
}

function getAll(req, res, next) {
    scheduleService.getAll()
        .then(users => res.json({ data:users ,message:'Succesful'}))
        .catch(next);
}

function register(req,res,next) {
    scheduleService.create(req.body)
        .then(()=> res.json({ message:'Registro exitoso!'}))
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


