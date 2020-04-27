const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
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
    },
    tokens:[{
       token:{
        type:String,
        required:true
       }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})
userSchema.methods.toJSON = function() {
    const user = this;

    const userObj = user.toObject();

    delete userObj.password;
    delete userObj.tokens;
    delete userObj.avatar;

    return userObj;
    
}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT);
    
    user.tokens = user.tokens.concat({token});
    
    await user.save();
    
    return token;

}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email});
    if(!user)
        throw new Error('The email does not exist!');

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch)
        throw new Error('Unable to login!');

    return user;
}
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    
    next();
})

userSchema.pre('remove', async function(next){
    const user = this;
    
    await Task.deleteMany({owner:user._id});
    next();
})

const User = mongoose.model('User',userSchema);

module.exports = User;