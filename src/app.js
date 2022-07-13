const fs = require('fs');
const { createRouter } = require('httpserver');
const { notFoundHandler, logHandler, parseUrl,
  timeStampHandler } = require('./app/staticHandler.js');
const { guestBookRouter } = require('./app/guestBookRouter.js');
const { apiRouter } = require('./app/apiRouter.js');
const { parseBodyParams } = require('./app/parseBodyParams.js');
const { serveFileContent } = require('./app/serveFileContent.js');
const { injectCookies } = require('./app/injectCookies.js');
const { injectSession } = require('./app/injectSession.js');
const { parseSearchParams } = require('./app/parseSearchParams.js');
const { loginHandler } = require('./app/loginHandler.js');
const { logoutHandler } = require('./app/logoutHandler.js');
const { signupHandler } = require('./app/signUpHandler.js');

const app = (config) => {
  const guestBook = JSON.parse(fs.readFileSync(config.commentsFile, 'utf8'));

  const handlers = [
    parseUrl,
    timeStampHandler,
    parseBodyParams,
    parseSearchParams,
    injectCookies,
    injectSession(config.sessions),
    logHandler,
    loginHandler(config.sessions, config.users),
    signupHandler(config.users),
    apiRouter(guestBook),
    guestBookRouter(guestBook, config.commentsFile),
    serveFileContent('./public'),
    logoutHandler(config.sessions),
    notFoundHandler
  ];

  return createRouter(handlers);
};

module.exports = { app };
