const fs = require('fs');
const { logHandler, timeStampHandler } = require('./app/staticHandler.js');
const { getGuestBookHandler,
  postGuestBookHandler } = require('./app/guestBookRouter.js');
const { apiRouter } = require('./app/apiRouter.js');
const { injectCookies } = require('./app/injectCookies.js');
const { injectSession } = require('./app/injectSession.js');
const { postLoginHandler, getLoginHandler } = require('./app/loginHandler.js');
const { logoutHandler } = require('./app/logoutHandler.js');
const { getSignupHandler,
  postSignupHandler } = require('./app/signUpHandler.js');
const express = require('express');

const createApp = (config, userSessions, users) => {
  const { commentsFile, logger } = config;
  const guestBook = JSON.parse(fs.readFileSync(commentsFile, 'utf8'));
  const app = express();

  const guestBookRouter = express.Router();
  guestBookRouter.get('/', getGuestBookHandler(guestBook));
  guestBookRouter.get('/api', apiRouter(guestBook));
  guestBookRouter.post('/add-comment', postGuestBookHandler(guestBook, commentsFile));

  app.use(express.urlencoded({ extended: true }));
  app.use(timeStampHandler, injectCookies,
    injectSession(userSessions), logHandler(logger));

  app.get('/login', getLoginHandler);
  app.get('/signup', getSignupHandler);
  app.use('/guestbook', guestBookRouter);
  app.get('/logout', logoutHandler(userSessions));

  app.post('/login', postLoginHandler(userSessions, users));
  app.post('/signup', postSignupHandler(users));

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
