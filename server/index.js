const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
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
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

const hostname = 'localhost';
const port = process.env.PORT || 80

// registerRoutes(app);

app.post('/cpu', (req, res) => {
    const {modelName, clockSpeed, cores} = req.body
    const sqlInsert = "INSERT INTO cpus (model_name, clockspeed, cores) VALUES (?,?,?)";
    db.query(sqlInsert, [
        modelName, 
        clockSpeed, 
        cores
    ], (err, result) => {
        console.log(result);
    })
})
// app.post('/cpu', (req, res) => {
//     const modelName = req.body.modelName
//     const clockSpeed = req.body.clockSpeed
//     const cores = req.body.cores

//     const sqlInsert = "INSERT INTO cpus (model_name, clockspeed, cores) VALUES (?,?,?)";
//     db.query(sqlInsert, [modelName, clockSpeed, cores], (err, result) => {
//         console.log(result);
//     })
// })

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});