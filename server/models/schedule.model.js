const mongoose = require('mongoose')
const Schema = mongoose.Schema
const counter = require('./counter.model')

const ScheduleSchema = Schema({
    day_number: {
        type: Number,
    },
    day: {
        type: String
    },
    date: {
        type: Date
    },
    activity: {
        type: String
    },
    start_time: {
        type: Date,
    },
    end_time: {
        type: Date
    },
    location: {
        type: String
    },
    comments: {
        type: String
    },
    volunteer_view: {
        type: Boolean,
        default: false
    },
    participant_view: {
        type: Boolean,
        default: false
    },
    visitor_view: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('Schedule', ScheduleSchema)