const mongoose = require('mongoose')
const Schema = mongoose.Schema
const counter = require('./counter.model')

const ScheduleSchema = Schema({
    day_number: {
        type: Number,
    }
})

module.exports = mongoose.model('Schedule', ScheduleSchema)