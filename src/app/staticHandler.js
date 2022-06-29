const fs = require('fs');

const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.status = 'Not Found';
  response.end('Not Found');
  return true;
};

const serveFileContent = (request, response, path) => {
  let { url: { pathname } } = request;
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const fileName = path + pathname;

  if (!fs.existsSync(fileName)) {
    return false;
  }

  const content = fs.readFileSync(fileName);
  response.setHeader('content-type', 'text/html');
  response.end(content);
  return true;
};

module.exports = { serveFileContent, notFoundHandler };
