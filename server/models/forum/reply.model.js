const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SchemaTypes = mongoose.SchemaTypes

const replySchema = Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  }
})