const fs = require('fs');
const { notFoundHandler,
  serveFileContent } = require('./app/staticHandler.js');
const { guestBookHandler } = require('./app/guestBookHandler.js');

const guestBook = JSON.parse(fs.readFileSync('./data/comments.json', 'utf8'));
const handlers = [
  guestBookHandler(guestBook), serveFileContent('./public'), notFoundHandler
];

const createHandle = (handlers) => {
  return (request, response) => {
    return handlers.some((handler) => handler(request, response));
  };
};

const handle = createHandle(handlers);

module.exports = { handle };
