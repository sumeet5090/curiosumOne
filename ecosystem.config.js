const path = require('path')
const config = require('dotenv').config({path: path.join(__dirname, '.env')}).parsed
module.exports = {
  apps : [{
    name: 'mec_website',
    script: '"yarn start"',
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '3G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      ...config
    }
  }],

  deploy : {
    production : {
      key: '~/.ssh/id_rsa',
      user : 'frozen',
      host : 'mobilityeng.online',
      ref  : 'origin/master',
      repo : 'git@github.com:frozen4code/mec_website.git',
      path : '~/prod/mec_website',
      "forward-agent": true,
      'post-deploy' : 'yarn && yarn build && pm2 startOrRestart "yarn start" --env production --update-env'
    }
  }
};