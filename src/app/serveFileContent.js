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

const serveFileContent = path => (request, response, next) => {
  const { method } = request;
  let { url: { pathname } } = request;
  if (pathname === '/' && method === 'GET') {
    pathname = '/index.html';
  }

  const fileName = path + pathname;

  if (!fs.existsSync(fileName)) {
    next();
    return false;
  }

  fs.readFile(fileName, (error, content) => {
    if (error) {
      next();
      return;
    }
    response.setHeader('content-type', getMimeType(pathname));
    response.end(content);
  });
};

module.exports = { serveFileContent };