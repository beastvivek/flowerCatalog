const fs = require('fs');
const { notFoundHandler, logHandler,
  timeStampHandler } = require('./app/staticHandler.js');
const { guestBookRouter } = require('./app/guestBookRouter.js');
const { apiRouter } = require('./app/apiRouter.js');
const { createRouter } = require('httpserver');
const { parseBodyParams } = require('./app/parseBodyParams.js');
const { serveFileContent } = require('./app/serveFileContent.js');

const guestBook = JSON.parse(fs.readFileSync('./data/comments.json', 'utf8'));
const handlers = [
  timeStampHandler, logHandler, parseBodyParams, apiRouter(guestBook),
  guestBookRouter(guestBook), serveFileContent('./public'), notFoundHandler
];

const router = createRouter(handlers);

module.exports = { router };
