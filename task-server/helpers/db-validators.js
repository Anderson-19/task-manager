const User = require('../models/User');
const Task = require('../models/Task');

const existsEmail = async ( email = '' ) =>{
    const existsEmail = await User.findOne({ email });
    if( existsEmail ){
        throw new Error(`the email: ${ email } is registered in DB`);
    }
}

const existsUserID = async ( id = '' ) =>{
    const existsID = await User.findById( id );
    if( !existsID ){
        throw new Error(`the id: ${ id } not exists`);
    }
}

const existsTaskID = async ( task_id = '' ) =>{
    const existsID = await Task.findById( task_id );
    if( !existsID ){
        throw new Error(`the id: ${ task_id } not exists`);
    }
}

module.exports = {
    existsEmail,
    existsUserID,
    existsTaskID
}