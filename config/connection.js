const Sequelize = require('sequelize');
const mysql = require('mysql2');

require('dotenv').config();

// create connection to our db
const sequelize = new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;