const express = require('express');
const { registerRoutes } = require('./routes');
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config();
// const { registerRoutes } = require('./routes');
const db = require('./utils/db');

const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

const hostname = 'localhost';
const port = process.env.PORT || 80

// registerRoutes(app);

registerRoutes(app, db);

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const closeServer = () => {
    db.disconnect();
    process.exit();
}

process.on('SIGINT', () => closeServer());
process.on('SIGTERM', () => closeServer());