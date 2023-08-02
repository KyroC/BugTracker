const jwt = require("jsonwebtoken")
const bugRouter = require('express').Router()
const Bug = require('../models/bugModel')
const User = require("../models/userModel")

const getTokenFrom = req => {
    const authorization = req.get("authorization")
    if (authorization && authorization.startsWith('Bearer')) {
        return authorization.replace("Bearer ", "")
    }
    return null
}

//Get request
bugRouter.get('/', async(req,res) => {
    const bugs = await Bug.find({})
    res.json(bugs)
})
bugRouter.get('/:id',async(req,res) => {
    const bug = await Bug.findOne({"_id":req.params.id})
    res.json(bug)
})
bugRouter.put('/:id/addComment', async(req,res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if(!decodedToken.id) {
        return response.status(401).json({error:"Invalid Token"})
    }
    const submitter = await User.findById(decodedToken.id)
    req.body.comments["Submitter"] = submitter.name
    console.log(req.body.comments)
    const bug = await Bug.findOneAndUpdate(
        {"_id":req.params.id},
        {
            $addToSet: {
                "comments": req.body.comments,
            }
        }
        
    )
    .then(() => res.json("Comment successfully created"))
    .catch((err) => res.status(400).json("error: " + err))
})

//Post request
bugRouter.post('/', async(req,res) => {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if(!decodedToken.id) {
        return response.status(401).json({error:"Invalid Token"})
    }
    const body = req.body
    const bug = new Bug ({
        name: body.name,
        detail: body.detail,
        creator: decodedToken.id,
        users: body.users,
        project: body.project,
        priority: body.priority,
        status: body.status,
        type: body.type,
        comments: body.comments
    })
    const savedBug = await bug.save()
    res.json(savedBug)
})

module.exports = bugRouter