const { response } = require('express');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');

const createUser = async( req, res = response  ) => {
    
    const { email, password } = req.body;

    try {
        
        let usuario = await Usuario.findOne({ email });

        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        usuario = new Usuario( req.body );

        //ENCRYPT PASSWORD

        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync( password, salt)


        await usuario.save();

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const loginUser = ( req, res = response ) => {
    
    const {email, password } = req.body;


    res.json({
        ok: true,
        msg: 'Login',
        email,
        password
    })
}

const renewUser =  ( req, res = response ) => {
    
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    createUser,
    loginUser,
    renewUser,
}