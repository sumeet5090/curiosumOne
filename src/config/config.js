let CONFIG = {
  app: process.env.APP || 'dev',
  port: process.env.PORT || '3000',
  db_dialect: process.env.DB_DIALECT || 'mongo',
  db_host: process.env.DB_HOST || 'localhost',
  db_port: process.env.DB_PORT || '27017',
  db_name: process.env.DB_NAME || 'website_mec_development',
  db_user: process.env.DB_USER || 'root',
  db_password: process.env.DB_PASSWORD || 'toor',
  jwt_secret: process.env.JWT_SECRET || 'jwtsecret123token',
  jwt_expiration: process.env.JWT_EXPIRATION || '1 day',
  google_clientId: process.env.GOOGLE_CLIENT_ID,
  salt_bcrypt: process.env.SALT_BCRYPT || 14
}
CONFIG.db_uri = 'mongodb://' + CONFIG.db_host + ':' + CONFIG.db_port + '/' + CONFIG.db_name
module.exports = CONFIG;