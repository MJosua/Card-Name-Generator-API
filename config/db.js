const mysql = require('mysql2');
const util = require('util');

const dbConf = mysql.createPool({
    multipleStatements: true,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Add event listener for error
dbConf.on('error', err => {
    console.error('Failed to connect to database:', err);
});

const dbQuery = util.promisify(dbConf.query).bind(dbConf);

module.exports = { dbConf, dbQuery };
