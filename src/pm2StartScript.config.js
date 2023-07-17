module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      script: 'npm',
      args: 'run start',
      interpreter: 'none',
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
