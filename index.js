const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// Create the express server 

const app = express();

// database

dbConnection();

// CORS
app.use(cors());

// public diretory

app.use( express.static('public'));

// reading and pase of body
app.use( express.json() );

// Routes
app.use('/api/auth', require('./routes/auth'));
// TODO CRUD: events



// listen requests

app.listen( process.env.PORT, () => {
    console.log(`Servidor correindo en puerto ${ process.env.PORT }`)
});

