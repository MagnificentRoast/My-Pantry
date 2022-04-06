const Sequelize = require('sequelize');
const mysql = require('mysql2');

require('dotenv').config();

// create connection to our db (old code)
// const sequelize = new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
// });

// create connection to our db (new code)
let sequelize

if (process.env.JAWSDV_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
        },
    );
}

module.exports = sequelize;