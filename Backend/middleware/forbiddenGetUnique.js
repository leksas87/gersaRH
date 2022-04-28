const jwt = require('express-jwt');
const { secret } = require('config.json');
const {models} = require('./../libs/sequelize');

module.exports = forbiddenGetUnique;

function forbiddenGetUnique() {
    return [

        // attach full user record to request object
        async (req, res, next) => {

            
            // revisa si el usuario tiene permisos de ver la informacion
            if( req.user.id != req.params.id){
                        return res.status(403).json( {message: 'Usuario no autorizado'});
            }
            next();
        }
    ];
}