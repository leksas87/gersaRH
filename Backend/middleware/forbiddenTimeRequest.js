const jwt = require('express-jwt');
const { secret } = require('config.json');
const {models} = require('./../libs/sequelize');
const { includes } = require('mysql2/lib/constants/charset_encodings');

module.exports = forbiddenTimeRequest;

function forbiddenTimeRequest() {
    return [

        // attach full user record to request object
        async (req, res, next) => {
            
            const timeRequestId=req.params.id;
            //obtiene el dato del usuario asignado al time request
            const employee=await models.Employee.findOne({where:{userId:req.user.id}});

            const timeRequest=await models.TimeRequest.findOne({where:{employeeId:employee.id, id:timeRequestId}});
            // revisa si el usuario tiene permisos de ver la informacion
            if(!timeRequest){
                return res.status(403).json( {message: 'Usuario no autorizado'});
            }
            if( timeRequest.id != req.params.id && employee.id != timeRequest.emplyeeId){
                return res.status(403).json( {message: 'Usuario no autorizado'});
            }
            next();
        }
    ];
}