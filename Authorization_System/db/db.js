const mysql = require('mysql2');
const dbconfig = require('../config/database.js')
const connection = mysql.createConnection(dbconfig)
const connectionPromise = connection.promise()

module.exports = connectionPromise;

