const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

router.post('/tasks',async (req,res) => {
    const newTask = new Task(req.body);
    try{
        await newTask.save()
        res.status(201).send(newTask)
    }catch(e){
        res.status(400).send(e);
    }
})


router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})

        res.status(200).send(tasks)
    }catch(e){
        res.status(500).send(e);
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const task = await Task.findById(_id)
        if(!task)
            return res.status(400).send(`task with ${_id} does not exist`)
        res.status(200).send(task);
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id;

    const update = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];

    const isValid = update.every(cur => allowedUpdates.includes(cur))
    if(!isValid)
        return res.status(404).send('Invalid Update!!!');

    try{
        const task = await Task.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});

        if(!task)
            return res.status(404).send();
        
        res.send(task);
    }
    catch(e){
        res.status(500).send(e);
    }
})


router.delete('/tasks/:id', async (req,res) => {
    try{
        const task = await Task.findOneAndDelete(req.params.id);
        
        if(!task)
            return res.status(400).send();

        res.send(task);
    }catch(e){
        res.status(500).send();
    }
})

module.exports = router;