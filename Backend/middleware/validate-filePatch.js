const jwt = require('express-jwt');
const { secret } = require('config.json');
const {models} = require('./../libs/sequelize');

module.exports = validateFilePatch;

function validateFilePatch() {
    return [

        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub' (subject) property
            const user = await models.User.findByPk(req.user.id);
            // check user still exists
            const file = await models.File.findByPk(req.params.id);
            if(!file)
                return res.status(400).json({ message: 'El archivo no existe.'});

            if(!user)
                return res.status(400).json({ message: 'El empleado no existe.'});
            console.log(req.user.rollTypeId);
            if(req.user.rollTypeId === 2 ){
                console.log("Empleado");
                if( req.user.id != file.employeeId)
                 return res.status(403).json( {message: 'Usuario no autorizado'});
            }
           


            next();
        }
    ];
}