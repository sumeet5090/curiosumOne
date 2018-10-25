const mongoose = require('mongoose')
const Schema = mongoose.Schema

const liveTimingSchema = Schema({
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }, 
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    lap_number: {
        type: String
    },
    lap_time: {
        type: String
    },
    driver_initial: {
        type: String
    }
})

module.exports = mongoose.model('LiveTiming', liveTimingSchema)