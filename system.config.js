// Run :  pm2 start ./system.config.js
// The above command start with below configuration

module.exports = {
  apps: [
    {
      name: 'Node-Dev',
      exec_mode: 'fork',
      instances: '1',
      script: 'node ./build/server.js', // your script
      args: 'start',
      env: {
        NODE_ENV: 'devlopment',
        PORT: 4002,
      },
    },
  ],
};
