const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const validateRequestQuery = require('middleware/validate-request-query');
const fileService = require('../services/file.service');
const authorize = require('middleware/authorize');
const validateFileName = require('middleware/validate-fileName');
const validateFilePatch = require('middleware/validate-filePatch');
const validateFileQuery = require('middleware/validate-fileQuery');

router.post('/',authorize(),registerSchema,validateFileName(), register);
router.patch('/:id', authorize(), updateSchema,validateFilePatch(), update);
router.delete('/:id', authorize(),validateFilePatch(), _delete);
router.get('/', authorize(),getSchema,validateFileQuery(), getFile1);

module.exports = router;

function _delete(req, res, next) {
    fileService.delete(req.params.id)
        .then(() => res.json({ message: 'Archivo eliminado exitosamente'}))
        .catch(next);
}

function getSchema(req, res, next) {
    const schema = Joi.object({
        ubicacionCarpeta: Joi.string().required(),
        tipoDocumento: Joi.number(),
        employeeId: Joi.number(),
    });
    validateRequestQuery(req, next, schema);
}

function getFile1(req,res,next) {
    fileService.getFile1(req, res)
        .then(contracts => res.json({data:contracts ,message:'Succesful'}))
        .catch(next);
}

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