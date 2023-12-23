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

#### Pm2 watch mode

`application restart via pm2 restart app --watch .` <br>

PM2 can automatically restart your application when a file is modified in the current directory or its subdirectories:

pm2 start app.js --watch
Or via configuration file set the option watch: true.

If an application is started with the --watch option, stopping the app will not prevent it to be restarted on file change. To totally disable the watch feature, do: pm2 stop app --watch or toggle the watch option on application restart via pm2 restart app --watch.

To watch specific paths, please use a Ecosystem File, watch can take a string or an array of paths. Default is true:

module.exports = {
apps: [{
script: "app.js",
watch: ["server", "client"],
// Delay between restart
watch_delay: 1000,
ignore_watch : ["node_modules", "client/img", "\\.git", "*.log"],
}]
}

### rest api like dev.http

`### provide 3 hash for enable get call` <br>
