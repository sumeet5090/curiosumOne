const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SchemaTypes = mongoose.SchemaTypes

const querySchema = Schema({
  name: {
    type: String,
  },
  rule: {
    type: SchemaTypes.ObjectId,
    ref: 'Rule'
  },
  subject: {
    type: String,
  },
  date_posted: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['open', 'resolved', 'closed']
  },
  replies: [{
    type: SchemaTypes.ObjectId,
    ref: 'Reply'
  }],
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Query', querySchema)