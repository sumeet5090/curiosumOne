let keys = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 27017,
        name: process.env.DB_NAME || 'website_mec_test',
        options: {
            user: process.env.DB_USER || "frozen",
			pass: process.env.DB_PASSWORD || "root",
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            authSource: process.env.DB_AUTH_DATABASE
        }
    },
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID || '821702270771-jvo6konvg5drjege6ucn83c9vq13u9qa.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'vZ28ZCS7KRxbGSak9sZQkBvd'
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
        maxAge: 24 * 7 * 60 * 60 * 10000
    }
}
keys.db.uri = `mongodb://${keys.db.host}:${keys.db.port}/${keys.db.name}?authSource=${keys.db.options.authSource}`

module.exports = keys