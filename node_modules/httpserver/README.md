# Installation
```js 
npm install 'https://github.com/beastvivek/httpServer'
```

# Usage
```js
// Import httpServer and createRouter.
const {httpServer,createRouter}=require('httpServer');

// Pass list of handlers to createRouter to get router back.
const router=createRouter([handlers...]);

// Pass a port number and the router that you created to httpServer.
httpServer(port,router);

// All done now you can use the server
```