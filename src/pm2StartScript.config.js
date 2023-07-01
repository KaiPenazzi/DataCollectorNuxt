module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      script: 'npm',
      args: 'run start',
      interpreter: 'none',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
