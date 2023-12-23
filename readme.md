## Node App using typescript

-[ ] node18

#### Passing environment variables to node.js using pm2

`PORT=4001 pm2 start ./build/server.js --update-env` <br>

#### List of pm2 commands

`pm2 start ./build/server.js`<br>
`pm2 status`<br>
`pm2 logs`<br>
`pm2 save`<br> - Save Configuration for startup
`pm2 show 0`<br> - process Id like 0,1,2 etc.

```ts
// Add your own code metrics: http://bit.ly/code-metrics
//  Use `pm2 logs server [--lines 1000]` to display logs
//  Use `pm2 env 0` to display environment variables
//  Use `pm2 monit` to monitor CPU and Memory usage server
```
