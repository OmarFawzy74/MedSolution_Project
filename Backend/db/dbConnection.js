const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: "omar_fawzy74",
    password: "waNBp6d.Uh.gE2G",
    database: "medsolution_db",
    port: "3306"
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