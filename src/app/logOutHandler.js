const logoutHandler = (sessions) => (request, response, next) => {
  const { method, url: { pathname } } = request;

  if (pathname === '/logout' && method === 'GET') {
    response.setHeader('set-cookie', `id=${request.session.sessionId};Max-Age=0`);
    delete sessions[request.session.sessionId];
    request.session = {};
    response.statusCode = 302;
    response.setHeader('location', '/');
    response.end();
    return;
  }
  next();
};

module.exports = { logoutHandler };
