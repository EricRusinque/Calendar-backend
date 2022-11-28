const express = require('express');

// Create the express server 

const app = express();

// Routes

app.get('/', ( req, res ) => {
    
    console.log('Se requiere /');
    res.json({
        ok: true
    })
});


// listen requests

app.listen( 4000, () => {
    console.log(`Servidor correindo en puerto ${4000}`)
});

