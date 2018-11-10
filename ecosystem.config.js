module.exports = {
  apps : [{
    name: 'mec_website',
    script: 'server/index.js',
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '3G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
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
      'post-deploy' : 'yarn && yarn build && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
};