const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
//const validateRequestQuery=require('middleware/validate-request-query');
const fileService = require('../services/file.service');
const authorize = require('middleware/authorize')
const validateFileName = require('middleware/validate-fileName')
const forbidden = require('middleware/forbidden')

router.post('/',authorize(),validateFileName(), registerSchema, register);
//router.get('/',registerSchemaCheck,check);

module.exports = router;

function registerSchema(req,res,next) {
    const schema = Joi.object({
        employeeId: Joi.number().required(),
        employeeIdUpload: Joi.number().required(),
        nombreArchivo: Joi.string().required(),
        ubicacionCarpeta: Joi.string().required(),
        url: Joi.string().required(),
        tipoDocumento: Joi.number().required()
    });
    validateRequest(req, next, schema);
    console.log("*****2*****");
}

function register(req, res, next) {
    fileService.create(req.body,res)
        .then(() => res.json({ message: 'Registro exitoso' }))
        .catch(next);
}