const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const fileService = require('../services/file.service');
const authorize = require('middleware/authorize')
const validateFileName = require('middleware/validate-fileName')

router.post('/',authorize(),validateFileName(), registerSchema, register);
router.patch('/:id', authorize(), validateFileName(), updateSchema, update);

module.exports = router;

function update(req, res, next) {
    fileService.update(req.params.id, req.body)
        .then(contract => res.json({data:contract ,message:'Succesful'}))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        employeeId: Joi.number(),
        employeeIdUpload: Joi.number(),
        isFileActive: Joi.boolean(),
        nombreArchivo: Joi.string(),
        ubicacionCarpeta: Joi.string(),
        url: Joi.string(),
        tipoDocumento: Joi.number()
    });
    validateRequest(req, next, schema);
}

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
}

function register(req, res, next) {
    fileService.create(req.body,res)
        .then(() => res.json({ message: 'Registro exitoso' }))
        .catch(next);
}