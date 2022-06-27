const { serveFileContent,
  dynamicHandler, notFoundHandler } = require('./src/handler.js');
const { startServer } = require('./src/serverLib.js');

const handle = (handlers, path = './public') => {
  return (request, response) => {
    return handlers.some((handler) => handler(request, response, path));
  };
};

const httpServer = (port, handle) => {
  startServer(handle, port);
};

const handlers = [dynamicHandler, serveFileContent, notFoundHandler];

httpServer(8800, handle(handlers));
