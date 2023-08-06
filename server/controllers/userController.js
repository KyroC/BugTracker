//library for hashing password
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/userModel')
const Bug = require('../models/bugModel')


usersRouter.get('/', async(req,res) => {
    const users = await User.find({})
    .populate('projects')
    res.json(users)
})

usersRouter.get('/:userId/projects', async(req,res) => {
    const user = await User.findOne({"_id":req.params.userId})
    .populate('projects')
    res.json(user.projects)
})

usersRouter.get('/:userId/tickets', async(req,res) => {
    const user = await User.findOne({"_id":req.params.userId})
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