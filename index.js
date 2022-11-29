const express = require('express');
require('dotenv').config();


// Create the express server 

const app = express();


// public diretory

app.use( express.static('public'))

// Routes

// app.get('/', ( req, res ) => {
    
//     console.log('Se requiere /');
//     res.json({
//         ok: true
//     })
// });


// listen requests

app.listen( process.env.PORT, () => {
    console.log(`Servidor correindo en puerto ${ process.env.PORT }`)
});

