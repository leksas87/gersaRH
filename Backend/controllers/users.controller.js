const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('middleware/validate-request');
const authorize = require('middleware/authorize')
const userService = require('../services/user.service');
const { required } = require('joi');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register',authorize(), registerSchema, register);
router.post('/registerMaster', registerSchemaMaster, registerMaster);
router.get('/renew',authorize(),revalidadToken);
router.get('/', getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);
router.get('/confirmation/:token',authenticateToken);
router.post('/confirmation',updateConfirmation);


module.exports = router;
/*
function authenticateUserConfirmation(req, res, next) {
    console.log(req.body);
    userService.getByToken(req.body)
        .then(user => res.json({ data:user ,message:'Succesful',ok:true}))
        .catch(next);
}*/

function updateConfirmation(req, res, next) {
    console.log(req.body);
    userService.updateConfirmation(req.body)
        .then(user => res.json({data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json({data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function authenticateToken(req, res, next) {
    console.log(req.params.token);
    userService.getByToken(req.params.token)
        .then(user => res.json({ data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json({ data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function revalidadToken(req, res, next) {
    userService.reenvioToken(req.user)
        .then(user => res.json({ data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        phone:Joi.string().required(),
        confirmationCode:Joi.string()
    });
    validateRequest(req, next, schema);
}

function registerSchemaMaster(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        active:Joi.boolean().required(),
        password: Joi.string().required(),
        roll:Joi.number().required(),
        phone:Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registro exitoso' ,ok:true}))
        .catch(next);
}

function registerMaster(req, res, next) {
    userService.createMaster(req.body)
        .then(() => res.json({ message: 'Registro exitoso' ,ok:true}))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json({ data:users ,message:'Succesful',ok:true}))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json({ data:user ,message:'Succesful',ok:true}))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        username: Joi.string().empty(''),
        password: Joi.string().min(6).empty(''),
        phone:Joi.string().empty(''),
        active:Joi.boolean(),
    });
    validateRequest(req, next, schema);
}
/*
function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => res.json({data:user ,message:'Succesful',ok:true}))
        .catch(next);
}*/

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'Usuario eliminado exitosamente' ,ok:true}))
        .catch(next);
}