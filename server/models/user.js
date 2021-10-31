const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Todo = require('./todo')

const JWT_SECRET = "thisismyproject"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    } ,
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter the proper email id")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Pls enter a unique password")
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
}, {
    timestamps:true
})

userSchema.statics.findByCredentials = async (email , password)=>{
    const user = await User.findOne({email: email})
    if(!user){
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("Unable to login")
    }

    return user
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    // Below it is done to convert the ObjectID into the normal String
    const token = jwt.sign({_id : user._id.toString()} , JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.pre('save' , async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }
    next()
})

userSchema.virtual('todo' , {
    ref:'Todo',
    localField:'_id',
    foreignField:'owner'
})

const User = mongoose.model('User' , userSchema)

module.exports = User