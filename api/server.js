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

server.get('/api/users',(res,req)=>{
    User.find()
    .then(users=>{
        console.log(users)
        res.status(200).json(users)
    })
    .catch(err =>{
        res.status(500).json({message:err.message})
    })
})

server.post('/api/users',(res,req)=>{
    const newUser= req.body
    if(!newUser.name || !newUser.bio)
    {
        res.status(422).json('Need name and bio')
    }
    else
    {
        User.insert(newUser)
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(err =>{
            res.status(500).json({message:err.message})
        })
    }
})

server.put('/api/users/:id', async (res,req)=>{
    const {id}= req.params
    const changes = req.body
    try
    {
        if(!changes.name || !changes.bio)
        {
            res.status(422).json("need name and bio")
        }
        else
        {
            const updateUser = await User.update(id,changes)
            if(!updateUser)
            {
                res.status(404).json('User does not exist')
            }
            else
            {
                res.status(200).json(updateUser)
            }
        }
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }

})



 // EXPORT YOUR SERVER instead of {}
