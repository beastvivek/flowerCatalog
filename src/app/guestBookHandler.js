const { generateGuestBook } = require('./generateGuestBook.js');

const commentHandler = (request, response) => {
  const guestBook = generateGuestBook(request);
  response.setHeader('content-type', 'text/html');
  response.end(guestBook);
  return true;
};

const addCommentHandler = (request, response) => {
  const { url: { pathname } } = request;
  if (pathname) {
    return commentHandler(request, response);
  }
  return false;
};

const dynamicHandler = (request, response) => {
  const { url: { pathname } } = request;
  if (pathname === '/guestbook.html') {
    return addCommentHandler(request, response);
  }
  return false;
};

module.exports = { dynamicHandler };
