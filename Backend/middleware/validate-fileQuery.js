const jwt = require('express-jwt');
const { secret } = require('config.json');
const {models} = require('./../libs/sequelize');

module.exports = validateFileQuery;

function validateFileQuery() {
    return [

        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub' (subject) property
            const user = await models.User.findByPk(req.user.id);
            // check user still exists
            if(!user)
                return res.status(400).json({ message: 'El empleado no existe.'});
            if(req.user.rollTypeId != 1 && req.query.ubicacionCarpeta === "empresa")
                return res.status(403).json( {message: 'Usuario no autorizado'});
            if(req.user.rollTypeId != 1 && !req.query.employeeId && !req.query.tipoDocumento && !req.query.ubicacionCarpeta )
                return res.status(403).json( {message: 'Usuario no autorizado'});
            if(req.query.employeeId && parseInt(req.query.employeeId) != req.user.id && req.user.rollTypeId != 1 )
                return res.status(403).json( {message: 'Usuario no autorizado'});

            next();
        }
    ];
}