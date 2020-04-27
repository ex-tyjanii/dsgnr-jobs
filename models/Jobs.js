const mongoose = require("mongoose");


const JobSchema = new mongoose.Schema({
    title: String,
    type: String,
    location: String,
    company: String,
    remote: Boolean,
    coompany_url: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    applicaation_link: String,
    salary: Number,
    description: {
        type: String,
        trim: true
    }
})

const Jobs = mongoose.model("Jobs", JobSchema)
module.exports = Jobs;