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

  const loginRouter = express.Router();
  loginRouter.get('/', getLoginHandler);
  loginRouter.post('/', postLoginHandler(userSessions, users));

  const signupRouter = express.Router();
  signupRouter.get('/', getSignupHandler);
  signupRouter.post('/', postSignupHandler(users));

  app.use([express.urlencoded({ extended: true }), timeStampHandler, injectCookies, injectSession(userSessions), logHandler(logger)]);
  app.use('/guestbook', guestBookRouter);
  app.use('/login', loginRouter);
  app.use('/signup', signupRouter);

  app.get('/logout', logoutHandler(userSessions));

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
