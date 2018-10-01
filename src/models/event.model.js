const mongoose = require('mongoose')
// const passportLocalMongoose = require('passport-local-mongoose')
let Schema = mongoose.Schema;
let EventSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    venue: {
        type: String
    },
    orgranizer: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    link: {
        type: String
    }
}, {timestamps: true})
module.exports = mongoose.model('Event', EventSchema)