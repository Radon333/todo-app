const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
})

const Todo = mongoose.model('Todo' , todoSchema)
module.exports = Todo