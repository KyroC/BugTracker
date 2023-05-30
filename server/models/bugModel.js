const mongoose = require('mongoose')

const bugSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

bugSchema.set('timestamps', true);

const Bug = mongoose.model('Bug',bugSchema)

module.exports = Bug