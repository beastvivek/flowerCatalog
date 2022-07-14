const apiRouter = (guestBook) => (request, response) => {
  request.guestBook = guestBook;
  response.setHeader('content-type', 'text/plain');
  response.end(JSON.stringify(request.guestBook));
};

module.exports = { apiRouter };
