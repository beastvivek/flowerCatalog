const fs = require('fs');
const { generateGuestBook } = require('./generateGuestBook.js');

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

const pushNewComment = (request, name, comment) => {
  const timeStamp = request.timeStamp;
  const post = { timeStamp, name, comment };
  request.guestBook.unshift(post);
  fs.writeFileSync(
    './data/comments.json',
    JSON.stringify(request.guestBook), 'utf8');
  return true;
};

const addCommentHandler = (request, response) => {
  const { url: { pathname } } = request;
  const { name, comment } = toGuestBookParams(request.url.searchParams);
  if (pathname && name && comment) {
    pushNewComment(request, name, comment);
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

const guestBookHandler = (guestBook) => (request, response) => {
  const { url: { pathname } } = request;

  if (pathname === '/add-comment') {
    request.guestBook = guestBook;
    return addCommentHandler(request, response);
  }
  if (pathname === '/guestbook.html') {
    request.guestBook = guestBook;
    return showGuestBook(request, response);
  }
  return false;
};

module.exports = { guestBookHandler };
