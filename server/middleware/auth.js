const jwt = require('jsonwebtoken')
const User = require('../models/user')

const JWT_SECRET = "thisismyproject"

const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ' , '')
        const decoder = jwt.verify(token , JWT_SECRET)
        const user = await User.findOne({ _id : decoder._id , 'tokens.token':token})

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(401).send({ error :"Please autheticate"})
    }
}

module.exports = auth