# DotNetCoreWebsocketAngular2Client
A simple .NET Core MVC WebSocket project with a simple angular2 websocket client (from angular2-seed). Additional Ionic2 sample added. 

The client is from [Angular2-seed](https://github.com/angular/angular2-seed), which details how to get that project running. 

*Angular2: The home page looks at an external websocket service. The about page looks at our MVC websocket handler.*
*Ionic2: The home page looks at an external websocket service.*

### Usage (Server)

1. Clone the repository.
2. Open 'angular2-seed-MvcServerWebsockets' in Visual Studio. You may need to install [.NET Core](https://www.microsoft.com/net/core#windows) separately.
3. Hit Run.


### Usage (Angular2 Client)
- Clone or fork this repository
- Make sure you have [node.js](https://nodejs.org/) installed version 5+
- Make sure you have NPM installed version 3+
- `WINDOWS ONLY` run `npm install -g webpack webpack-dev-server typescript` to install global dependencies
- run `npm install` to install dependencies
- run `npm start` to fire up dev server
- open browser to [`http://localhost:3000`](http://localhost:3000)
- if you want to use other port, open `package.json` file, then change port in `--port 3000` script



### Usage (Ionic2)

- Follow the [start tutorial](http://ionicframework.com/docs/v2/intro/installation/) to get Ionic2 installed 
- cd to the project directory.
- Run `ionic serve`


#### To test the Ionic2 APK, you will need to sign it.

To create your key, use [these instructions](http://stackoverflow.com/a/15330139/852806)

*Add Android*
`cordova platform add android --save`

*Publish*
cd "{ProjectDir}"
`cordova build android --prod --release`

`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "{ProjectDir}/platforms/android/build/outputs/apk/my-release-key.keystore" -storepass {KEY} -keypass {KEY} "{ProjectDir}/platforms/android/build/outputs/apk/android-release-unsigned.apk" {KEY}`

`jarsigner -verify -verbose -certs "{ProjectDir}/platforms/android/build/outputs/apk/android-release-unsigned.apk"`

cd to zipalign

`cd C:/Program Files (x86)/Android/android-sdk/build-tools/23.0.1`

`zipalign -v 4 "{ProjectDir}/platforms/android/build/outputs/apk/android-release-unsigned.apk" "{ProjectDir}/platforms/android/build/outputs/apk/android-release-signed.apk"`

