const express = require('express');
require('dotenv').config();


// Create the express server 

const app = express();


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

