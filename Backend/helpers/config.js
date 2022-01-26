const config = require('config.json');

const { host, port, user, password, database } = config.database;
const URI = `mysql://${user}:${password}@${host}:${port}/${database}`;
module.exports = {
    development:{
        url:URI,
        dialect:'mysql',
    },
    production:{
        url:URI,
        dialect:'mysql',
    }
}