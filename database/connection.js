const mysql = require('mysql');
require('dotenv');

const db = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect((err) => {
    if(err) {
        console.log("Error connecting to the database!");
        return;
    }
    console.log("Connection established successfully");
})


module.exports = db;