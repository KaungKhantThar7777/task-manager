const express = require('express');
const router = new express.Router();
const User = require('../models/user');


router.post('/users',async (req,res) => {
    const newUser = new User(req.body);

    try{
        await newUser.save()
        res.status(201).send(newUser)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).send(users)
    }catch(e){
        res.status(500).send(e);
    }
})

router.get('/users/:id',async  (req, res) => {
    const _id = req.params.id;
    try{
        const user =await User.findById(_id)
        if(!user)
            return res.status(400).send(`User with ${_id} does not exist`)
        res.status(200).send(user);
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name","email","password","age"];
    const isValid = updates.every((cur) => allowedUpdates.includes(cur));

    if(!isValid)
        return res.status(404).send('Invalid Update!');
    const id = req.params.id;
    try{
        const user = await User.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
        
        if(!user)
            return res.status(404).send()
        
        res.status(200).send(user);
    }catch(e){
        res.status(500).send(e);
    }
})

router.delete('/users/:id', async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        
        if(!user)
            return res.status(400).send();
        
        res.send(user);
    }catch(e){
        res.status(500).send();
    }   
})


module.exports = router;