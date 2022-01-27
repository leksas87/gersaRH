const jwt = require('express-jwt');
const { secret } = require('config.json');
const sequelize = require('./../libs/sequelize');

module.exports = authorize;

function authorize() {
    return [
        // authenticate JWT token and attach decoded token to request as req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub' (subject) property
            const user = await sequelize.findByPk(req.user.sub);

            // check user still exists
            if (!user)
                return res.status(401).json({ message: 'Usuario no autorizado',ok:false});

            // authorization successful
            req.user = user.get();
            next();
        }
    ];
}
