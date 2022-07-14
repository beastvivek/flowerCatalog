const logoutHandler = (sessions) => (request, response) => {
  response.setHeader('set-cookie', `id=${request.session.sessionId};Max-Age=0`);
  delete sessions[request.session.sessionId];
  request.session = {};
  response.statusCode = 302;
  response.setHeader('location', '/');
  response.end();
};

module.exports = { logoutHandler };
