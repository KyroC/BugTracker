const bugRouter = require('express').Router()
const Bug = require('../models/bugModel')

//Get request
bugRouter.get('/', async(req,res) => {
    const bugs = await Bug.find({})
    res.json(bugs)
})
bugRouter.get('/:id',async(req,res) => {
    const bug = await Bug.find({"_id":req.params.id})
    res.json(bug)
})

//Post request
bugRouter.post('/', async(req,res) => {
    const body = req.body

    const bug = new Bug ({
        name: body.name,
        detail: body.detail,
        creator: body.creator,
        users: body.users,
        project: body.project,
        priority: body.priority,
        status: body.status,
        type: body.type
    })
    const savedBug = await bug.save()
    res.json(savedBug)
})

module.exports = bugRouter