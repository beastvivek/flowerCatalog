const fs = require('fs');
const { logHandler,
  timeStampHandler } = require('./app/staticHandler.js');
const { getGuestBookHandler,
  postGuestBookHandler } = require('./app/guestBookRouter.js');
const { apiRouter } = require('./app/apiRouter.js');
const { parseBodyParams } = require('./app/parseBodyParams.js');
const { injectCookies } = require('./app/injectCookies.js');
const { injectSession } = require('./app/injectSession.js');
const { parseSearchParams } = require('./app/parseSearchParams.js');
const { postLoginHandler, getLoginHandler } = require('./app/loginHandler.js');
const { logoutHandler } = require('./app/logoutHandler.js');
const { getSignupHandler,
  postSignupHandler } = require('./app/signUpHandler.js');
const express = require('express');

const createApp = (config, userSessions, users) => {
  const { commentsFile, logger } = config;
  const guestBook = JSON.parse(fs.readFileSync(commentsFile, 'utf8'));
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(timeStampHandler, parseBodyParams, parseSearchParams, injectCookies, injectSession(userSessions), logHandler(logger));

  app.get('/login', getLoginHandler);
  app.get('/signup', getSignupHandler);
  app.get('/guestbook/api', apiRouter(guestBook));
  app.get('/guestbook', getGuestBookHandler(guestBook));
  app.get('/logout', logoutHandler(userSessions));

  app.post('/login', postLoginHandler(userSessions, users));
  app.post('/signup', postSignupHandler(users));
  app.post('/guestbook', postGuestBookHandler(guestBook, commentsFile));

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
