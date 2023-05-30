const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/userModel')
const Bug = require('../models/bugModel')


usersRouter.get('/', async(req,res) => {
    const users = await User
    res.json(users)
})

usersRouter.post('/', async(req,res) => {
    const {name, email, password, admin} = req.body 
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User ({
        name,
        email,
        passwordHash,
        admin
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = usersRouter