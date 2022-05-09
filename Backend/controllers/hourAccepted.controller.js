const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize')
const hoursAccepted = require('../services/hourAccepted.service');
const forbiddenJefeCuadrilla = require('middleware/forbiddenJC');
// routes
router.patch('/:id', authorize(), forbiddenJefeCuadrilla(),updateSchema,update);
router.delete('/:id', authorize(),forbiddenJefeCuadrilla(), deleteById);

module.exports = router;

function update(req, res, next) {
    hoursAccepted.update(req.params.id, req.body)
        .then(hoursAccepted => res.json({data:hoursAccepted ,message:'Succesful'}))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        fechaCreacion: Joi.string(),
        employeeId: Joi.string().required(),
        fechaEvento: Joi.string(),
        horasAceptadas: Joi.string(),
        employeeIdAcepto: Joi.number().integer().required()
    });
    validateRequest(req, next, schema);
}

function deleteById(req, res, next) {
    hoursAccepted.delete(req.params.id)
        .then(() => res.json({ message: 'Registro eliminado exitosamente' ,ok:true}))
        .catch(next);
}