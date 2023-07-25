const jwt = require('express-jwt');
const { secret } = require('config.json');
const {models} = require('./../libs/sequelize');
const { Employee } = require('../db/models/employee.model');

module.exports = forbiddenGet;

function forbiddenGet() {
    return [

        // attach full user record to request object
        async (req, res, next) => {

            
            // revisa si el usuario tiene permisos de ver la informacion

            const employee=await Employee.findOne({where:{userId:req.user.id}});
            if(req.user.rollTypeId == 2 && employee.id != req.params.id){
                        return res.status(403).json( {message: 'Usuario no autorizado'});
            }
            next();
        }
    ];
}