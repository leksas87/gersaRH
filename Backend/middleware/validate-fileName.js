const jwt = require('express-jwt');
const { secret } = require('config.json');
const {models} = require('./../libs/sequelize');

module.exports = validateFileName;

function validateFileName() {
    return [

        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub' (subject) property
            const fileName = await models.File.findOne({ where: { nombreArchivo: req.body.nombreArchivo, employeeId: req.body.employeeId } });
            const user = await models.User.findByPk(req.body.employeeId);
            // check user still exists
            if(!user)
                return res.status(400).json({ message: 'El empleado no existe.'});

            if(req.user.rollTypeId == 2 && req.body.employeeId != req.body.employeeIdUpload || req.user.id != req.body.employeeIdUpload )
            return res.status(403).json( {message: 'Usuario no autorizado'});

            if (fileName)
                return res.status(400).json({ message: 'El nombre del archivo "' + req.body.nombreArchivo + '" ya existe.'});

            next();
        }
    ];
}