let keys = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 27017,
        name: process.env.DB_NAME || 'website_mec_test',
        options: {
            user: process.env.DB_USER || "",
            pass: process.env.DB_PASSWORD || "",
            useNewUrlParser: true
		}
    },
    google: {
        clientID: '821702270771-jvo6konvg5drjege6ucn83c9vq13u9qa.apps.googleusercontent.com',
        clientSecret: 'vZ28ZCS7KRxbGSak9sZQkBvd'
    },
    bcrypt: {
        salt: 12
    },
    jwt: {
        secret: 'bdingbdingtingting',
        expiration: "7 days"
    },
    session: {
        secret: "HAHAHAHAHA SEssIoN SseCret!@? weQEQ",
        maxAge: 24*7*60*60*10000
    }
}
keys.db.uri = 'mongodb://' + keys.db.host + ':' + keys.db.port + '/' + keys.db.name
module.exports = keys