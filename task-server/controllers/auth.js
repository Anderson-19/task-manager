const bcryptjs = require('bcryptjs');
const { request , response } = require('express');

const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/User');

const login = async ( req = request, res = response ) =>{

    const { email, password } = req.body;

    try {
        
        //Verificar si el email existe
        const user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({
                msj: `User / Password invalid - ${email}`
            })
        }
    
        // Si el user esta activo
        if( !user.state ){
            return res.status(400).json({
                msj: `User / Password invalid - State: ${user.state}`
            })
        }
    
        // Verificar pass
        const validPassword = bcryptjs.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                msj: `User / Password invalid - password: ${password}`
            })
        }
        // Generar JWT
        const token = await generateJWT( user.id );

        res.status(200).json({user, token, verify: true});

    } catch (error) {
        console.log(error);
        res.status(500).json({msj: 'Consultar con el admin', verify: false});
    }
}

module.exports = {
    login
}