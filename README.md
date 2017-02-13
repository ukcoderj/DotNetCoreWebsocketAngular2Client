# DotNetCoreWebsocketAngular2Client
A simple .NET Core MVC WebSocket project with a simple angular2 websocket client (from angular2-seed)

The client is from [Angular2-seed](https://github.com/angular/angular2-seed), which details how to get that project running. 

*The home page looks at an external websocket service. The about page looks at our MVC websocket handler.*

### Usage (Server)

1. Clone the repository.
2. Open 'angular2-seed-MvcServerWebsockets' in Visual Studio. You may need to install [.NET Core](https://www.microsoft.com/net/core#windows) separately.
3. Hit Run.


### Usage (Client)
- Clone or fork this repository
- Make sure you have [node.js](https://nodejs.org/) installed version 5+
- Make sure you have NPM installed version 3+
- `WINDOWS ONLY` run `npm install -g webpack webpack-dev-server typescript` to install global dependencies
- run `npm install` to install dependencies
- run `npm start` to fire up dev server
- open browser to [`http://localhost:3000`](http://localhost:3000)
- if you want to use other port, open `package.json` file, then change port in `--port 3000` script
