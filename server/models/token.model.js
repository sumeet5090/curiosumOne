const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    team_id: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    token: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 43200
    }
})

// tokenSchema.pre('save', async function (next) {
//     next()
// })

module.exports = mongoose.model('token', tokenSchema)