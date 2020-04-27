const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next) => {
    try{
    const token = req.header('Authorization').replace('Bearer ','');
    const decode = await jwt.verify(token,process.env.JWT);
    const user = await User.findOne({_id:decode._id,"tokens.token":token})
    
    req.user = user;
    req.token = token;
    next();
    }catch(e){
        res.status(401).send({error:'Please Authenticate.'})
    }
}

module.exports = auth;