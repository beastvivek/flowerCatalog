const logoutHandler = (sessions) => (request, response) => {
  response.setHeader('set-cookie', `id=${request.session.sessionId};Max-Age=0`);
  delete sessions[request.session.sessionId];
  request.session = {};
  response.status(302);
  response.location('/');
  response.end();
};

module.exports = { logoutHandler };
