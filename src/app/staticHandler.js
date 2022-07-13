const notFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.status = 'Not Found';
  response.end('Not Found');
};

const parseUrl = (request, response, next) => {
  const host = request.headers.host;
  const url = request.url;
  request.url = new URL(`http://${host}${url}`);
  next();
};

const logHandler = (request, response, next) => {
  console.log(`${request.method} ${request.url.pathname} ${request.timeStamp}`);
  next();
};

const timeStampHandler = (request, response, next) => {
  const date = new Date();
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString();
  request.timeStamp = `${day} ${time}`;
  next();
};

module.exports = { notFoundHandler, logHandler, timeStampHandler, parseUrl };
