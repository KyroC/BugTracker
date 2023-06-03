const projectRouter = require('express').Router()
const Project = require("../models/projectModel")
const User = require('../models/userModel')
const Bug = require('../models/bugModel')

projectRouter.get('/', async (req,res) => {
    const projects = await Project.find({})
    res.json(projects)
})

projectRouter.post('/',async (req,res) => {
    const {name, details, users, bugs, creatorId} = req.body

    const creator = await User.findById(creatorId)
    const project = new Project ({
        name,
        details,
        users,
        bugs,
        creatorId
    })
    const savedProject = await project.save()
    console.log(creator)
    //Adding project to creator
    creator.projects = creator.projects.concat(savedProject._id)
    await creator.save()
    res.json(savedProject)
})

module.exports = projectRouter