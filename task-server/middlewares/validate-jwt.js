const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


const validateJWT = async ( req = request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msj: 'Token does not exist'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        
        const userAuth = await User.findById( uid );

        if ( !userAuth ) {
            return res.status(401).json({
                msj: `Invalid Token - user does not exist in DB`
            })
        }
        
        if ( !userAuth.state ) {
            return res.status(401).json({
                msj: `Invalid Token - state in: ${userAuth.state}`
            })
        }
       
        req.userAuth = userAuth;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ msj: 'Invalid Token' });    
    }


}

module.exports = {
    validateJWT
}