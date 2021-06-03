// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users/:id',(req,res)=>{
    const idVar = req.params.idVar
    User.findById(idVar)
    .then(user=>{
        if(!user)
        {
            res.status(404).json('User does not exist')
        }
        else
        {
            res.json(user)
        }
    })
    .catch(err =>{
        res.status(500).json({message:err.message})
    })
} )



 // EXPORT YOUR SERVER instead of {}
