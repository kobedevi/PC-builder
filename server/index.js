const express = require('express');
require('dotenv').config();
// const { registerRoutes } = require('./routes');
const mysql = require('mysql');

// connect with database
const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const app = express();

const hostname = 'localhost';
const port = process.env.PORT || 80

// registerRoutes(app);

app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO cpus (model_name, clockspeed, cores) VALUES ('RYZEN 5700X', 4.5, 16)"
    db.query(sqlInsert, (err, result) => {
        res.send("hello world")
        console.log(err)
        console.log("")
        console.log(result)
    })
})

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});