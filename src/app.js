const { notFoundHandler,
  serveFileContent } = require('./app/staticHandler.js');
const { guestBookHandler } = require('./app/guestBookHandler.js');

const handlers = [
  guestBookHandler, serveFileContent('./public'), notFoundHandler
];

const createHandle = (handlers) => {
  return (request, response) => {
    return handlers.some((handler) => handler(request, response));
  };
};

const handle = createHandle(handlers);

module.exports = { handle };
