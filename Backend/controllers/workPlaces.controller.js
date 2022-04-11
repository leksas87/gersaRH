const express = require('express');
const router = express.Router();
const Joi = require('joi');
const authorize = require('middleware/authorize');
const workPlaceService = require('../services/workPlace.service');

router.get('/',authorize(), getWorkPlaces);

module.exports = router;

function getWorkPlaces(req,res,next) {
    workPlaceService.getWorkPlaces()
        .then(workPlaces => res.json({ data:workPlaces ,message:'Succesful'}))
        .catch(next);
}

