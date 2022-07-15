const fs = require('fs');
const { GuestBook, generateGuestBook } = require('./guestBook.js');

const writeToFile = (comments, toFile) => {
  fs.writeFileSync(toFile, comments, 'utf8');
};

const createAddCommentHandler = (toFile) => (request, response, next) => {
  const { originalUrl } = request;
  const { comment } = request.body;
  if (originalUrl && comment) {
    const guestBook = new GuestBook(request.guestBook);
    const timeStamp = request.timeStamp;
    const name = request.session.username;
    const post = { timeStamp, name, comment };
    guestBook.addComment(post);
    const posts = guestBook.toJson();
    writeToFile(posts, toFile);
    response.end(posts);
    return;
  }
  next();
};

const showGuestBook = (request, response, next) => {
  const { originalUrl } = request;
  if (!request.session && originalUrl === '/guestbook') {
    response.status(302);
    response.location('/login');
    response.end();
    next();
    return;
  }
  const { guestBook, session: { username } } = request;
  const content = generateGuestBook(guestBook, username);
  response.type('text/html');
  response.end(content);
};

const getGuestBookHandler = (guestBook) => (request, response, next) => {
  request.guestBook = guestBook;
  return showGuestBook(request, response, next);
};

const postGuestBookHandler = (guestBook, toFile) => (request, response, next) => {
  request.guestBook = guestBook;
  const addCommentHandler = createAddCommentHandler(toFile, next);
  return addCommentHandler(request, response);
};

module.exports = { getGuestBookHandler, postGuestBookHandler };
