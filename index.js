const { dynamicHandler } = require('./src/app/guestBookHandler.js');
const { serveFileContent,
  notFoundHandler } = require('./src/app/staticHandler.js');
const { startServer } = require('./src/server/server.js');

const handle = (handlers, path = './public') => {
  return (request, response) => {
    return handlers.some((handler) => handler(request, response, path));
  };
};

const httpServer = (handle, port) => {
  startServer(handle, port);
};

const handlers = [dynamicHandler, serveFileContent, notFoundHandler];

httpServer(8800, handle(handlers));
