const jwt = require('express-jwt');
const { secret } = require('config.json');
const {models} = require('./../libs/sequelize');

module.exports = forbiddenJefeCuadrilla;

function forbiddenJefeCuadrilla() {
    return [

        // attach full user record to request object
        async (req, res, next) => {
            console.log(req.user);
            // revisa si el usuario tiene permisos de ver la informacion
            if (req.user.rollTypeId ==2)
                return res.status(403).json( {message: 'Usuario no autorizado'});
            next();
        }
    ];
}