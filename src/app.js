const fs = require('fs');
const { createRouter } = require('httpserver');
const { notFoundHandler, logHandler,
  timeStampHandler } = require('./app/staticHandler.js');
const { guestBookRouter } = require('./app/guestBookRouter.js');
const { apiRouter } = require('./app/apiRouter.js');
const { parseBodyParams } = require('./app/parseBodyParams.js');
const { serveFileContent } = require('./app/serveFileContent.js');
const { injectCookies } = require('./app/injectCookies.js');
const { injectSession } = require('./app/injectSession.js');
const { parseSearchParams } = require('./app/parseSearchParams.js');
const { loginHandler } = require('./app/loginHandler.js');
const { logOutHandler } = require('./app/logOutHandler.js');

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
  logOutHandler(sessions),
  notFoundHandler
];

const router = createRouter(handlers);

module.exports = { router };
