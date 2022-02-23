const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const validateRequestQuery=require('middleware/validate-request-query');
const checkService = require('../services/check.service');

router.post('/',registerSchema, register);
router.get('/',registerSchemaCheck,check);

module.exports = router;

function registerSchemaCheck(req,res,next) {
    const schema = Joi.object({
        accessCode: Joi.number().integer().required(),
        isCheckInEntry:Joi.boolean().required()
    });
    validateRequestQuery(req, next, schema);
}

function check(req,res,next) {
    checkService.review(req.query)
        .then(()=>res.json({message:'Completado con exito',ok:true}))
        .catch(next);
}

function registerSchema(req, res, next) { 
    const schema = Joi.object({
        employeeId: Joi.number().integer().required(),
        longitude:Joi.string().required(),
        latitude:Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    checkService.create(req.body)
        .then(() => res.json({ message: 'Registro exitoso' ,ok:true}))
        .catch(next);
}

