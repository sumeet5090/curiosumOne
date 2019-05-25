const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SchemaTypes = mongoose.SchemaTypes

const replySchema = Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  },
  text: String,
  created: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('Reply', replySchema)