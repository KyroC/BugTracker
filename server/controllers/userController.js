const userRouter = require('express').Router()
const User = require('../models/userModel')
const Bug = require('../models/bugModel')

userRouter.get('/', async(req,res) => {
    const users = await User
    reponse.json(users)
})

userRouter.post('/', async(req,res) => {
    const body = req.body 
})