const projectRouter = require('express').Router()
const Project = require("../models/projectModel")
const User = require('../models/userModel')
const Bug = require('../models/bugModel')

projectRouter.get('/', async (req,res) => {
    const projects = await Project.find({})
    res.json(projects)
})

projectRouter.post('/',async (req,res) => {
    const {name, details, users, bugs} = req.body
    const project = new Project ({
        name,
        details,
        users,
        bugs
    })
    const savedProject = await project.save()
    res.json(savedProject)
})

module.exports = projectRouter