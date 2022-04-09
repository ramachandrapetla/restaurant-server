const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect((err) => {
    if(err) {
        console.log("Error connecting to the database! " + err);
        return;
    }
    console.log("Connection established successfully");

})

module.exports = {connection};