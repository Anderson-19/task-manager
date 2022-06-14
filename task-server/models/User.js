const { Schema, model } = require('mongoose');

const UserSchema = Schema(
    {
        name:{
            type: String,
            require:true
        },
        lastname:{
            type: String,
            require:true
        },
        username:{
            type: String,
            require:true
        },
        email:{
            type: String,
            require:true,
            unique:true
        },
        password:{
            type: String,
            require:true
        },
        avatar:{
            type: String,
        },
        role: {
            type: String,
            required: true,
            default: 'USER_ROLE',
            emun: ['ADMIN_ROLE', 'USER_ROLE']
        },
        state: {
            type: Boolean,
            default: true
        },
        google: {
            type: Boolean,
            default: false
        },
    }
);

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);