module.exports = {
    apps: [
      {
        name: 'AGENT SUPPORT SERVER',
        script: 'server.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'development',
          PORT: 3001,
          DATABASE_HOST: '128.199.184.27',
          DATABASE_PORT: 3306,
          DATABASE_NAME: 'crm',
          DATABASE_USER: 'readuser',
          DATABASE_PASSWORD: '12003000'
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 3001,
          DATABASE_HOST: '128.199.184.27',
          DATABASE_PORT: 3306,
          DATABASE_NAME: 'crm',
          DATABASE_USER: 'readuser',
          DATABASE_PASSWORD: '12003000'
        }
      }
    ]
  };
  