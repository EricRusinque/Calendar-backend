const { response } = require('express');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')

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


        //Generate JSONWEBTOKEN JWT

        const token = await generateJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });


    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }
}

const loginUser = async( req, res = response ) => {
    
    const { email, password } = req.body;

    try {

        const  usuario = await Usuario.findOne({ email });

        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El Usuario no existe con ese Email'
            });
        }

        // confirm the passwords

        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            })
        }


        //Generate JSONWEBTOKEN JWT
        const token = await generateJWT( usuario.id, usuario.name );
    
        res.json({
            ok: true,
            udi: usuario.id,
            name: usuario.name,
            token
        });
 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
  
}

const revalidarToken =  async( req, res = response ) => {

    const { uid, name  } = req

    // generate a new JWT and return in this request 
    const token = await generateJWT( uid, name );
    
    res.json({
        ok: true,
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    revalidarToken,
}