const express = require('express')
const Todo = require('../models/todo')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/addtodo' , auth , async (req , res)=>{
    const todo = new Todo({
        ...req.body,
        owner:req.user._id
    })

    try{
        await todo.save()
        res.status(201).send(todo)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/gettodo' , auth , async (req , res)=>{
    try{
        const todos = await Todo.find({owner:req.user._id})
        res.send(todos)
    }catch(e){
        res.status(400).send()
    }
})

router.patch('/updatetodo/:id' , auth , async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(404).send({ error:"Invalid parameters" })
    }
    try{
        const todo = await Todo.findOne({_id:req.params.id , owner:req.user._id})
        
        if(!todo){
            return res.status(404).send()
        }

        updates.forEach((update) => todo[update] = req.body[update])
        await todo.save()

        res.send(todo)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/deletetodo/:id' , auth , async (req,res)=>{
    try{
        
        const todo = await Todo.findOneAndDelete({_id:req.params.id , owner:req.user._id})
        if(!todo){
            return res.status(404).send()
        }
        res.send(todo)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router