const mongoose = require('./mongoose')
const keys = require('./../../config/keys')
function connect() {
    let db;
    mongoose.Promise = global.Promise;
    if (mongoose.connection.readyState !== 1) {
      console.log(keys.db.uri, keys.db.options);
        db = mongoose.connect(keys.db.uri, keys.db.options, function (err) {
            if (err) {
                console.error(err)
            }
            mongoose.set("debug", false)
        })
        mongoose.connection.once('open', function () {
            console.log("MongoDB Connection established.")
        })
        mongoose.connection.on('error', function (err) {
            if (err.message.code === "ETIMEDOUT") {
                console.log("Mongo instance timed out.\n", err)
                setTimeout(() => {
                    mongoose.createConnection(keys.db.uri, keys.db.options);
                }, 1000);
                return;
            }
            console.error("Couldn't connect to MongoDB\n", err)
        })
    } else {
        db = mongoose
    }
    return mongoose.connection
}
module.exports = connect
