const bugRouter = require('express').Router()
const Bug = require('../models/bugModel')
const Project = require('../models/projectModel')
const User = require('../models/userModel')

bugRouter.get('/', async(req,res) => {
    const bugs = await Bug
    res.json(bugs)
})

bugRouter.post('/', async(req,res) => {
    const body = req.body

    const bug = new Bug ({
        name: body.name,
        description: body.description,
        creator: body.creator,
        assignedTo: body.assignedTo
    })
    const savedBug = await bug.save()
    res.json(savedBug)
})

module.exports = bugRouter