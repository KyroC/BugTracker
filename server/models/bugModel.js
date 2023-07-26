const mongoose = require('mongoose')

const bugSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    priority:{
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    comments: {
        type: Array
    }
})

bugSchema.set('timestamps', true);

const Bug = mongoose.model('Bug',bugSchema)

module.exports = Bug