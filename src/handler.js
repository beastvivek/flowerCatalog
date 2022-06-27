const fs = require('fs');

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

module.exports = { serveFileContent, notFoundHandler };
