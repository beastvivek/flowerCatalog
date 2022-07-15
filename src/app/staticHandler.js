const logHandler = (logger) => (request, response, next) => {
  logger(`${request.method} ${request.originalUrl} ${request.timeStamp}`);
  next();
};

const timeStampHandler = (request, response, next) => {
  const date = new Date();
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString();
  request.timeStamp = `${day} ${time}`;
  next();
};

module.exports = { logHandler, timeStampHandler };
