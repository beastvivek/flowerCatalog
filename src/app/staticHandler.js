const fs = require('fs');

const contentType = {
  txt: 'text/plain',
  html: 'text/html',
  css: 'text/css',
  jpg: 'image/jpg',
  gif: 'animation/gif'
};

const getExtension = (fileName) => {
  const index = fileName.indexOf('.');
  return fileName.slice(index + 1);
};

const getMimeType = (fileName) => contentType[getExtension(fileName)];

const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.status = 'Not Found';
  response.end('Not Found');
  return true;
};

const serveFileContent = path => (request, response) => {
  let { url: { pathname } } = request;
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const fileName = path + pathname;

  if (!fs.existsSync(fileName)) {
    return false;
  }

  const content = fs.readFileSync(fileName);
  response.setHeader('content-type', getMimeType(pathname));
  response.end(content);
  return true;
};

module.exports = { serveFileContent, notFoundHandler };
