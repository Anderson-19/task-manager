require('../database/connectionDB');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserX = require('../models/User'); 

const userRegistration = async (req, res) => {

    try {
        
        let { name, username, lastname, email, password } = req.body;

        const user = new UserX({ 
            name, 
            lastname, 
            username, 
            email, 
            password, 
            avatar: "https://upload.wikimedia.org/wikipedia/commons/7/75/Falta_imagen.jpg",
            role: "USER_ROLE",
            state: true,
            google: true 
        });

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );

       const save = await user.save();

        if( save ){
            res.status(200).json({save, verify: true});
        }else{
            res.json({msg: 'ERROR', verify: false}); 
        }

    } catch (error) {
        console.log(error);
    }

}

const getUser = async (req, res) =>{

    const user = await UserX.findOne({_id:{$eq:req.params.id}});

    res.status(200).json({verify: true, contentUser: user});

} 

module.exports = {
    userRegistration,
    getUser 
}