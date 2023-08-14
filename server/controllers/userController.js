//library for hashing password
const bcrypt = require('bcrypt')
const jwt=require("jsonwebtoken")
const usersRouter = require('express').Router()
const User = require('../models/userModel')
const Bug = require('../models/bugModel')


const getTokenFrom = req => {
    const authorization = req.get("authorization")
    if (authorization && authorization.startsWith('Bearer')) {
        return authorization.replace("Bearer ", "")
    }
    return null
}

usersRouter.get('/', async(req,res) => {
    const users = await User.find({})
    .populate('projects')
    res.json(users)
})

usersRouter.get('/projects', async(req,res) => {
    if (getTokenFrom(req) === null) {
        return res.status(401).json({ error: 'token missing' })
      }
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: "Invalid Token"})
    }
    const user = await User.findOne({"_id":decodedToken.id})
    .populate('projects')
    res.json(user.projects)
})

usersRouter.get('/tickets', async(req,res) => {
    if (getTokenFrom(req) === null) {
        return res.status(401).json({ error: 'token missing' })
      }
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: "Invalid Token"})
    }
    const user = await User.findOne({"_id":decodedToken.id})
    .populate('bugs')
    res.json(user.bugs)
})

usersRouter.post('/', async(req,res) => {
    const {name, email, password, admin, role, projects} = req.body 
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User ({
        name,
        email,
        passwordHash,
        admin,
        role,
        projects
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

usersRouter.put('/:userId/addProject', async(req, res) => {
    const user = await User.findOneAndUpdate(
        {"_id": req.params.userId},
        {
            $addToSet: {
                projects: req.body.projectId
            }
        }
    )
    .then(res.json("Project successfully added to user"))
    .catch((err) => res.status(400).json("error: " + err))
})

usersRouter.delete('/:userId/deleteProject', async(req, res) => {
    const user = await User.findOneAndUpdate(
        {"_id": req.params.userId},
        {
            $pull:{
                projects:req.body.projectId
            }
        }
    )
    .then(res.json("Project sucessfully deleted"))
    .catch((err) => res.status(400).json("error: " + err))
})

module.exports = usersRouter