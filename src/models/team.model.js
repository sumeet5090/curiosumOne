const mongoose = require('mongoose')
let Schema = mongoose.Schema;
let teamSchema = Schema({
    team_name: {
        type: String,
        required: true
    },
    team_location: {
        type: String
    },
    institution_name: {
        type: String,
    },
    institution_address: {
        type: String
    },
    team_bio: {
        type: String
    },
    team_logo_url: {
        type: String
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    captain_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Team', teamSchema)