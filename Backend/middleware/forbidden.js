const jwt = require('express-jwt');
const { secret } = require('config.json');
const {models} = require('./../libs/sequelize');

module.exports = forbidden;

function forbidden() {
    return [

        // attach full user record to request object
        async (req, res, next) => {

            // revisa si el usuario tiene permisos de ver la informacion
            if (req.user.rollTypeId != 1)
                return res.status(403).json( {message: 'Usuario no autorizado'});
            next();
        }
    ];
}