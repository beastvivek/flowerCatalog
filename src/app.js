const fs = require('fs');
const { notFoundHandler, logHandler, timeStampHandler,
  serveFileContent } = require('./app/staticHandler.js');
const { guestBookRouter } = require('./app/guestBookHandler.js');
const { apiRouter } = require('./app/apiRouter.js');
const { createRouter } = require('httpserver');

const guestBook = JSON.parse(fs.readFileSync('./data/comments.json', 'utf8'));
const handlers = [
  timeStampHandler, logHandler, apiRouter(guestBook),
  guestBookRouter(guestBook), serveFileContent('./public'), notFoundHandler
];

const router = createRouter(handlers);

module.exports = { router };
