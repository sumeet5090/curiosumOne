const mongoose = require('mongoose')
const Schema = mognoose.Schema

const AncmtSchema = Schema({
    dateTime: {
        type: Date,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    body: {

    },
    tags: [{
        type: String
    }]
})

module.exports = mongoose.model('Announcement', AncmtSchema)