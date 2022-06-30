const fs = require('fs');
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

const addCommentHandler = (request, response) => {
  const { url: { pathname } } = request;
  const guestBook = new GuestBook(request.guestBook);
  const { name, comment } = toGuestBookParams(request.url.searchParams);
  if (pathname && name && comment) {
    const timeStamp = request.timeStamp;
    guestBook.addComment({ timeStamp, name, comment });
    writeToFile(guestBook.toJson());
    return commentHandler(request, response);
  }
  return false;
};

const showGuestBook = (request, response) => {
  const content = generateGuestBook(request.guestBook);
  response.setHeader('content-type', 'text/html');
  response.end(content);
  return true;
};

const guestBookRouter = (guestBook) => (request, response) => {
  const { method, url: { pathname } } = request;

  if (pathname === '/add-comment' && method === 'GET') {
    request.guestBook = guestBook;
    return addCommentHandler(request, response);
  }
  if (pathname === '/guestbook.html' && method === 'GET') {
    request.guestBook = guestBook;
    return showGuestBook(request, response);
  }
  return false;
};

module.exports = { guestBookRouter };
