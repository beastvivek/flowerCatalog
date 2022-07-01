const commentsApiHandler = (request, response) => {
  response.setHeader('content-type', 'text/plain');
  response.end(JSON.stringify(request.guestBook));
};

const apiRouter = (guestBook) => (request, response, next) => {
  const { method, url: { pathname } } = request;

  if (pathname === '/api/guestbook' && method === 'GET') {
    request.guestBook = guestBook;
    commentsApiHandler(request, response);
    return true;
  }

  next();
};

module.exports = { apiRouter };
