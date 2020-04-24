const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(val){
            if(!validator.isEmail(val))
                throw new Error('Not valid email!!!')
        }
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'Shoud be greater than 6,doesn\' it?'],
        trim:true,
        validate(val){
            if(val.toLowerCase().includes('password'))
                throw new Error('Password should not contain password :(');
        }
    },

    age:{
        type:Number,
        default:18
    }
})

module.exports = User;