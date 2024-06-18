const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    hexcolor:{
        type: String,
        required: true
    }
})

module.exports = new mongoose.model("task",taskSchema)