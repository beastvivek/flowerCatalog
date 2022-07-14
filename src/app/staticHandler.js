const parseUrl = (request, response, next) => {
  const host = request.headers.host;
  const url = request.url;
  request.uri = new URL(`http://${host}${url}`);
  next();
};

const logHandler = (logger) => (request, response, next) => {
  logger(`${request.method} ${request.uri.pathname} ${request.timeStamp}`);
  next();
};

const timeStampHandler = (request, response, next) => {
  const date = new Date();
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString();
  request.timeStamp = `${day} ${time}`;
  next();
};

module.exports = { logHandler, timeStampHandler, parseUrl };
