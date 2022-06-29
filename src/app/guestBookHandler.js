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

const getTimeStamp = () => {
  const date = new Date();
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString();
  const timeStamp = `${day} ${time}`;
  return timeStamp;
};

const pushNewComment = (request, name, comment) => {
  const timeStamp = getTimeStamp();
  const post = { timeStamp, name, comment };
  request.comments.unshift(post);
  fs.writeFileSync(
    './data/comments.json',
    JSON.stringify(request.comments), 'utf8');
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
  const content = generateGuestBook(request.comments);
  response.setHeader('content-type', 'text/html');
  response.end(content);
  return true;
};

const guestBookHandler = (request, response) => {
  const { url: { pathname } } = request;
  const comments = JSON.parse(fs.readFileSync('./data/comments.json', 'utf8'));

  if (pathname === '/add-comment') {
    request.comments = comments;
    return addCommentHandler(request, response);
  }
  if (pathname === '/guestbook.html') {
    request.comments = comments;
    return showGuestBook(request, response);
  }
  return false;
};

module.exports = { guestBookHandler };
