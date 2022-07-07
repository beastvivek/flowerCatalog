const fs = require('fs');
const { createRouter } = require('httpserver');
const { notFoundHandler, logHandler,
  timeStampHandler } = require('./app/staticHandler.js');
const { guestBookRouter } = require('./app/guestBookRouter.js');
const { apiRouter } = require('./app/apiRouter.js');
const { parseBodyParams } = require('./app/parseBodyParams.js');
const { serveFileContent } = require('./app/serveFileContent.js');
const { loginHandler, injectCookies, injectSession,
  parseSearchParams } = require('./app/cookiesHandler.js');

const guestBook = JSON.parse(fs.readFileSync('./data/comments.json', 'utf8'));
const sessions = {};

const handlers = [
  timeStampHandler,
  parseBodyParams,
  parseSearchParams,
  injectCookies,
  injectSession(sessions),
  logHandler,
  loginHandler(sessions),
  apiRouter(guestBook),
  guestBookRouter(guestBook),
  serveFileContent('./public'),
  notFoundHandler
];

const router = createRouter(handlers);

module.exports = { router };
