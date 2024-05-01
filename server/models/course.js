require("./../database/connection");
const mongoose = require("mongoose");


const CourseSchema = new mongoose.Schema({
    course_id: {
        type: Number, default: Math.floor((Math.random() * 100000000) + 1)
    },
    title: {
        type: String,
        required: true
    },
    thumbnail_url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    lessons: [{
        title: String,
        content: [{
            name: String,
            url: String
        }]
    }],
    ratings: [{
        value: Number,
        student: String
    }],
    createdAt: {
        type: String,
        default: new Date().toLocaleString(),
    }

});

const Course = new mongoose.model("Course", CourseSchema);

module.exports = Course;
