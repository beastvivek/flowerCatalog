const { notFoundHandler,
  serveFileContent } = require('./app/staticHandler.js');
const { dynamicHandler } = require('./app/guestBookHandler.js');

// const readData = () => {

// };

const handlers = [
  dynamicHandler, serveFileContent('./public'), notFoundHandler
];

const createHandle = (handlers) => {
  return (request, response) => {
    return handlers.some((handler) => handler(request, response));
  };
};

const handle = createHandle(handlers);

module.exports = { handle };
