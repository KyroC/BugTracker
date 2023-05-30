const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    bugs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Bug"
    }]
})

const Project = mongoose.model('Project',projectSchema)

module.exports = Project;