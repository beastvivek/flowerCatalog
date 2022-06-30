const commentsApiHandler = (request, response) => {
  response.setHeader('content-type', 'text/plain');
  response.end(JSON.stringify(request.guestBook));
  return true;
};

const apiRouter = (guestBook) => (request, response) => {
  const { method, url: { pathname } } = request;

  if (pathname === '/api/guestbook' && method === 'GET') {
    request.guestBook = guestBook;
    return commentsApiHandler(request, response);
  }
};

module.exports = { apiRouter };
