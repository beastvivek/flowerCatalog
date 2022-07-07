const fs = require('fs');
const { GuestBook, generateGuestBook } = require('./guestBook.js');

const commentHandler = (request, response) => {
  response.statusCode = 302;
  response.setHeader('location', '/guestbook');
  response.end();
  return true;
};

const writeToFile = (comments) => {
  fs.writeFileSync('./data/comments.json', comments, 'utf8');
};

const addCommentHandler = (request, response, next) => {
  const { url: { pathname } } = request;
  const { comment } = request.bodyParams;
  if (pathname && comment) {
    const guestBook = new GuestBook(request.guestBook);
    const timeStamp = request.timeStamp;
    const name = request.session.username;
    guestBook.addComment({ timeStamp, name, comment });
    writeToFile(guestBook.toJson());
    return commentHandler(request, response);
  }
  next();
};

const showGuestBook = (request, response) => {
  const content = generateGuestBook(request.guestBook, request.session.username);
  response.setHeader('content-type', 'text/html');
  response.end(content);
};

const guestBookRouter = (guestBook) => (request, response, next) => {
  const { method, url: { pathname } } = request;

  if (!request.session && (pathname === '/add-comment' || pathname === '/guestbook')) {
    response.statusCode = 302;
    response.setHeader('location', '/login');
    response.end();
    return;
  }

  if (pathname === '/add-comment' && method === 'POST') {
    request.guestBook = guestBook;
    return addCommentHandler(request, response, next);
  }
  if (pathname === '/guestbook' && method === 'GET') {
    request.guestBook = guestBook;
    return showGuestBook(request, response);
  }
  next();
};

module.exports = { guestBookRouter };
