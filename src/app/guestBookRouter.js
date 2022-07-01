const fs = require('fs');
const { URLSearchParams } = require('url');
const { GuestBook, generateGuestBook } = require('./guestBook.js');

const commentHandler = (request, response) => {
  response.statusCode = 302;
  response.setHeader('location', '/guestbook.html');
  response.end();
  return true;
};

const toGuestBookParams = (params) => {
  const post = {};
  const entries = params.entries();

  for (const entry of entries) {
    post[entry[0]] = entry[1];
  }

  return post;
};

const writeToFile = (comments) => {
  fs.writeFileSync('./data/comments.json', comments, 'utf8');
};

const addCommentHandler = (request, response, next) => {
  const { url: { pathname } } = request;
  const guestBook = new GuestBook(request.guestBook);
  const { name, comment } = request.bodyParams;
  if (pathname && name && comment) {
    const timeStamp = request.timeStamp;
    guestBook.addComment({ timeStamp, name, comment });
    writeToFile(guestBook.toJson());
    return commentHandler(request, response);
  }
  next();
};

const showGuestBook = (request, response) => {
  const content = generateGuestBook(request.guestBook);
  response.setHeader('content-type', 'text/html');
  response.end(content);
};

const commentsHandler = (request, response, next) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    const bodyParams = toGuestBookParams(new URLSearchParams(data));
    request.bodyParams = bodyParams;
    addCommentHandler(request, response, next);
  });
};

const guestBookRouter = (guestBook) => (request, response, next) => {
  const { method, url: { pathname } } = request;

  if (pathname === '/add-comment' && method === 'POST') {
    request.guestBook = guestBook;
    return commentsHandler(request, response, next);
  }
  if (pathname === '/guestbook.html' && method === 'GET') {
    request.guestBook = guestBook;
    return showGuestBook(request, response);
  }
  next();
};

module.exports = { guestBookRouter };
