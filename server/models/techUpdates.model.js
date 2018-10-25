const mongoose = require('mongoose')
const Schema = mongoose.Schema

const techSchema = Schema({
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    accumulator: {
        type: String
    },
    scrutineering_elec: {
        type: String
    },
    scrutineering_mech: {
        type: String
    },
    driver_egress: {
        type: String
    },
    tilt: {
        type: String
    },
    noise_ready_to_drive_sound: {
        type: String
    },
    brakes: {
        type: String
    },
    rain: {
        type: String
    }
})

module.exports = mongoose.model('TechUpdates', techSchema)