const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const todoRouter = require('./routers/todo')
const cors = require('cors')


const app = express()
const port = 8000

app.use(express.json())
app.use('/user' , userRouter)
app.use(todoRouter)

 
app.use(cors(corsOptions))
app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
app.get('/' , (req , res)=>{
    res.send("This is the home page")
})

app.listen(port , ()=>{
    console.log("Server running successfully")
})