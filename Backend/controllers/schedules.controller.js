const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize')
const forbidden = require('middleware/forbidden')
const forbiddenGet = require('middleware/forbiddenGet')
const scheduleService = require('../services/schedule.service');
const moment = require('moment-timezone');
const {models} = require('./../libs/sequelize');

// routes
router.post('/', authorize(),forbidden(),authenticateSchema,register);
router.get('/',authorize(),forbidden(),getAll);
router.get('/:id', authorize(),forbiddenGet(), getById);
router.delete('/:id', authorize(),forbidden(), deleteSchedule);
router.put('/:id', authorize(),forbidden(),authenticateSchema, updateSchedule);
router.patch('/:id',authorize(),forbidden(),authenticateSchemaPatch,updateSchedule);

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
    scheduleService.create(req.body,res)
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
function authenticateSchemaPatch(req, res, next) {
    const schema = Joi.object({
        scheduleName: Joi.string(),
        horaEntrada: Joi.string(),
        horaSalida: Joi.string(),
        tiempoDescanso: Joi.number(),
        tiempoRetraso: Joi.number(),
        Lunes: Joi.boolean(),
        Martes: Joi.boolean(),
        Miercoles: Joi.boolean(),
        Jueves: Joi.boolean(),
        Viernes: Joi.boolean(),
        Sabado: Joi.boolean(),
        Domingo: Joi.boolean()
    });
    validateRequest(req, next, schema);
}

function updateSchedule(req, res, next) {
    scheduleService.update(req.params.id, req.body)
        .then(user => res.json({data:user ,message:'Succesful'}))
        .catch(next);
}

function getById(req, res, next) {
    scheduleService.getById(req.params.id)
        .then(user => res.json({ data:user ,message:'Succesful'}))
        .catch(next);
}