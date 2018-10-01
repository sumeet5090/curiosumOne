const mongoose = require('mongoose')
const CONFIG = require('../config/config')

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
try {
  let connection = mongoose.connect(CONFIG.db_uri, {
    useNewUrlParser: true
  })
  if (!connection) {
    console.error("Couldn't Connect to MongoDB.")
  } else {
    // console.log('Connected to MongoDB at ' + CONFIG.db_uri)
  }
  let db = mongoose.connection
  db.once('open', () => {
    console.log.bind(console, 'Connected to MongoDB at ' + CONFIG.db_uri)()
  })
  db.on('error', (err) => {
    console.error.bind(console, err)()
  })
} catch (error) {
  console.error.bind(console, error)()
  console.log("Couldn't connect to MongoDB Server")
}
module.exports = mongoose