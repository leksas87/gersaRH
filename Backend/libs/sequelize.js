const { Sequelize } = require('sequelize');
const mysql = require("mysql2");
const { config } = require('./../config/config');
const setupModels = require('./../db/models');

initialize();

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: true,
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;

async function initialize() {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);

  // Open the connection to MySQL server
  const connection = await mysql.createConnection({
    host: config.dbHost,
    user: USER,
    password: PASSWORD,
  });

  // Run create database statement
  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${config.dbName}`,
    function (err, results) {
      console.log(results);
      console.log(err);
    }
  );
  
}




