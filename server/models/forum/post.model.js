const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SchemaTypes = mongoose.SchemaTypes

const postSchema = Schema({
  name: {
    type: String,
  },
  section: {
    type: SchemaTypes.ObjectId,
    ref: 'Section'
  },
  rule: {
    type: SchemaTypes.ObjectId,
    ref: 'Rule'
  },
  sub_rule: {
    type: SchemaTypes.ObjectId,
    ref: 'SubRule'
  },
  subject: {
    type: String,
  },
  description: String,
  date_posted: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['open', 'resolved', 'closed'],
    default: function () {
      return 'open'
    }
  },
  post_type: {
    type: String,
    enum: ['public', 'private'],
    default: function () {
      return 'public'
    }
  },
  duplicate: {
    value: {
      type: Boolean,
      default: false
    },
    of: [String],
    marked_by: {
      type: SchemaTypes.ObjectId,
      ref: 'User'
    }
  },
  spam: {
    value: {
      type: Boolean,
      default: false
    },
    of: [String],
    marked_by: {
      type: SchemaTypes.ObjectId,
      ref: 'User'
    }
  },
  replies: [{
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User'
    },
    text: String,
    date: {
      type: Date,
      default: Date.now
    },
    highlight: {
      type: Boolean,
      default: false
    }
  }],
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  },
  team: {
    type: SchemaTypes.ObjectId,
    ref: 'Team'
  }
})

module.exports = mongoose.model('Post', postSchema)