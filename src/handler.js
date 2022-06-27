const fs = require('fs');
const { generateGuestBook } = require('./generateGuestBook');

const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.status = 'Not Found';
  response.send('Give a valid uri');
  return true;
};

const serveFileContent = (request, response, path) => {
  let { uri } = request;
  if (uri === '/') {
    uri = '/home.html';
  }

  const fileName = path + uri;

  if (!fs.existsSync(fileName)) {
    return false;
  }

  const content = fs.readFileSync(fileName);
  response.addHeader('content-type', 'text/html');
  response.send(content);
  return true;
};

const commentHandler = (request, response) => {
  const guestBook = generateGuestBook(request);
  response.addHeader('content-type', 'text/html');
  response.send(guestBook);
  return true;
};

const addCommentHandler = (request, response, path) => {
  const { uri } = request;
  if (uri) {
    return commentHandler(request, response, path);
  }
  return false;
};

const dynamicHandler = (request, response, path) => {
  const { uri } = request;
  if (uri === '/guestbook.html') {
    return addCommentHandler(request, response, path);
  }
  return false;
};

module.exports = { dynamicHandler, serveFileContent, notFoundHandler };
