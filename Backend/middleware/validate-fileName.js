const jwt = require('express-jwt');
const { secret } = require('config.json');
const {models} = require('./../libs/sequelize');

module.exports = validateFileName;

function validateFileName() {
    return [

        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub' (subject) property
            
            const user = await models.User.findByPk(req.body.employeeId);
            // check user still exists
            if(!user)
                return res.status(400).json({ message: 'El empleado no existe.'});
            if(req.user.rollTypeId === 2 ){ 
                if(req.body.employeeId != req.body.employeeIdUpload || req.user.id != req.body.employeeIdUpload )
                return res.status(403).json( {message: 'Usuario no autorizado'});
            }
            
            next();
        }
    ];
}