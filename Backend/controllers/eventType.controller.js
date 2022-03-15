const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize');
const eventTypeService = require('../services/eventType.service');

router.post('/',authorize(),registerSchema, register);
router.get('/:id',authorize(), getEventsById);
router.delete('/:id',authorize(), getEventsByIdDelete);
router.get('/',authorize(), getEvents);

module.exports = router;

function getEventsByIdDelete(req,res,next) {
    eventTypeService.getEventsByIdDelete(req.params.id)
        .then(event => res.json({ data:event ,message:'Succesful',ok:true}))
        .catch(next);
}

function getEvents(req,res,next) {
    eventTypeService.getEvents()
        .then(events => res.json({ data:events ,message:'Succesful',ok:true}))
        .catch(next);
}

function getEventsById(req,res,next) {
    eventTypeService.getEventsById(req.params.id)
        .then(event => res.json({ data:event ,message:'Succesful',ok:true}))
        .catch(next);
}

function registerSchema(req, res, next) { 
    const schema = Joi.object({
        nameType: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    eventTypeService.create(req.body)
        .then(() => res.json({ message: 'Registro exitoso' ,ok:true}))
        .catch(next);
}

