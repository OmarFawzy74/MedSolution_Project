const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT
});

//  host: "localhost",
//  user: "root",
//  password: "",
//  database: "ia-project",
//  port: "3306"


connection.connect((err) => {
    if(err) throw err
    console.log("DB is Connected");
});


module.exports = connection;