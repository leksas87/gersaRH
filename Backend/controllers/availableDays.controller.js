const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const forbiddenJefeCuadrilla = require('middleware/forbiddenJC');
const availableDaysService = require('../services/availableDays.service');
const authorize = require('middleware/authorize');

router.patch('/:id', authorize(),forbiddenJefeCuadrilla(), updateSchema, update);

module.exports = router;

function update(req, res, next) {
    availableDaysService.update(req.params.id, req.body)
        .then(contract => res.json({data:contract ,message:'Succesful'}))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        employeeId: Joi.number(),
        avaibleDays: Joi.number(),
        fechaLimite: Joi.string(),
        status: Joi.string(),
    });
    validateRequest(req, next, schema);
}