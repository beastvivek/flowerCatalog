const { handle } = require('./src/app.js');
const { httpServer } = require('./src/server/server.js');

httpServer(8800, handle);
