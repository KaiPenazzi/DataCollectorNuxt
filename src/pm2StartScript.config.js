module.exports = {
  apps: [
    {
      name: 'nuxt-app',
      script: 'bun',
      args: '.output/server/index.mjs',
      interpreter: 'none',
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
