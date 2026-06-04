import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
    // • Title (What project is called)
    title: {
        type: String,
        require: true,
        trim: true
    },
    // • Description (What was done)
    description: {
        type: String,
        require: true,
        trim: true
    },
    // • Images (Before/After photos)
    images: {
        type: String,
        require: true,
    },
    // • Status (Pending/Running/Done)
    status: {
        type: String,
        enum: ['pending', 'running', 'done', "upcomming"],
        default: 'pending'
    },
    //link to project details
    projectLink: {
        type: String,
        trim: true
    },
    // • Year/Category
    year: {
        type: Number,
        default: new Date().getFullYear()
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true })
const Project = mongoose.model("projects", ProjectSchema)
export default Project