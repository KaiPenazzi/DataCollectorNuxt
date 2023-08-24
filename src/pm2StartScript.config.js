module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      script: 'npx',
      args: 'nuxi preview',
      interpreter: 'none',
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
