const jwt=require("jsonwebtoken")
const projectRouter = require('express').Router()
const Project = require("../models/projectModel")
const User = require('../models/userModel')
const Bug = require('../models/bugModel')

const getTokenFrom = req => {
    const authorization = req.get("authorization")
    if (authorization && authorization.startsWith('Bearer')) {
        return authorization.replace("Bearer ", "")
    }
    return null
}

projectRouter.get('/', async (req,res) => {
    const projects = await Project.find({})
    res.json(projects)
})

projectRouter.get('/:projectId', async(req,res) => {
    const project = await Project.findOne({"_id":req.params.projectId})
    res.json(project)
})

projectRouter.post('/',async (req,res) => {
    const {name, details, users, bugs, creatorId} = req.body
    //decode user token
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: "Invalid Token"})
    }
    //get user by decoded ID
    const user = await User.findById(decodedToken.id)

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