const projectRouter = require('express').Router()
const Project = require("../models/projectModel")
const User = require('../models/userModel')
const Bug = require('../models/bugModel')

projectRouter.get('/', async (req,res) => {
    const projects = await Project.find({})
    res.json(projects)
})

projectRouter.post('/',async (req,res) => {
    const {name, users, bugs} = await Project
    const project = new Project ({
        name,
        users,
        bugs
    })
    const savedProject = await project.save()
    res.json(Project)
})

module.exports = projectRouter