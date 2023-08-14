const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    bugs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Bug"
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

projectSchema.set('timestamps', true);

const Project = mongoose.model('Project',projectSchema)

module.exports = Project;