const { app } = require('./src/app.js');
const { httpServer } = require('httpserver');

httpServer(8800, app);
