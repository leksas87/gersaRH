const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize')
const employeeService = require('../services/employee.service');

// routes
router.post('/register',registerSchema, register);
router.get('/:id', authorize(), getById);

module.exports = router;

function getById(req, res, next) {
    employeeService.getEmployeeById(req.params.id)
        .then(user => res.json({ data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        userId: Joi.number().integer().required(),
        fechaNacimiento:Joi.date().required(),
        frecuenciaPago:Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    employeeService.create(req.body)
        .then(() => res.json({ message: 'Registro exitoso' ,ok:true}))
        .catch(next);
}

