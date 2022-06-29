const { notFoundHandler,
  serveFileContent } = require('./app/staticHandler.js');
const { dynamicHandler } = require('./app/guestBookHandler.js');

const handlers = [dynamicHandler, serveFileContent, notFoundHandler];

const createHandle = (handlers, path = './public') => {
  return (request, response) => {
    return handlers.some((handler) => handler(request, response, path));
  };
};

const handle = createHandle(handlers);

module.exports = { handle };
