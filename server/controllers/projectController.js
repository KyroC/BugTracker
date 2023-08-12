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
    .populate('users')
    .populate('bugs')
    res.json(project)
})

projectRouter.post('/',async (req,res) => {
    const {name, details, users, bugs, } = req.body
    //decode user token
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: "Invalid Token"})
    }
    //get user by decoded ID
    const creator = await User.findById(decodedToken.id)
    const project = new Project ({
        name,
        details,
        users,
        bugs,
        creator: decodedToken.id
    })
    const savedProject = await project.save()
    console.log(creator)
    //Adding project to creator
    creator.projects = creator.projects.concat(savedProject._id)
    await creator.save()
    res.json(savedProject)
})

projectRouter.delete('/:projectId', async(req,res) => {
    const project = await Project.findOne(
        {"_id": req.params.projectId}
    )
    const user = await User.updateMany(
        {"_id":{"$in": project.users}},
        {
            $pull:{
                projects:req.params.projectId
            }
        }
    )
    const bug = await Bug.deleteMany(
        {
            "_id":{"$in":project.bugs}
        }
    )
    const projectDelete = await Project.findOneAndDelete({"_id":req.params.projectId})
    .then(() => res.json("Project deleted!"))
    .catch((err) => res.status(400).json("Error: " + err))
})
projectRouter.put('/:projectId', async(req,res) => {
    let params = {
        name: req.body.name,
        details: req.body.details,
        users: req.body.users,
        bugs: req.body.bugs,
    }
    for(let prop in params) if(!params[prop]) delete params[prop]
    console.log(params)

    const project = await Project.findOneAndUpdate({"_id": req.params.projectId},params)
    .then(() => res.json(params))
    .catch((err) => res.status(400).json("Error: " + err))
})
projectRouter.put('/:projectId/addUsers', async(req,res) => {
    const project = await Project.findOneAndUpdate(
        {"_id":req.params.projectId},
        {
            $addToSet:{
                users: req.body.userId 
            }
        })
        .then(() => res.json("User successfully assigned"))
        .catch((err) => res.status(400).json("error: " + err))
})
projectRouter.put('/:projectId/addBugs', async(req,res) => {
    const project = await Project.findOneAndUpdate(
        {"_id":req.params.projectId},
        {
            $addToSet:{
                bugs:req.body.bugId
            }
        }
    )
    .then(() => res.json("Ticket successfully created"))
    .catch((err) => res.status(400).json("error: " + err))
})
projectRouter.delete('/:projectId/deleteUsers', async(req,res) => {
    const project = await Project.findOneAndUpdate(
        {"_id":req.params.projectId},
        {
            $pull: {
                users:req.body.userId
            }
        }
    )
    .then(() => res.json("User successfully delete"))
    .catch((err) => res.status(400).json('error' + err))
//delete projects from users


})


module.exports = projectRouter