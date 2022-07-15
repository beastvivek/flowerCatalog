const logoutHandler = (sessions) => (request, response) => {
  response.cookie('id', `${request.session.sessionId}; Max - Age=0`);
  delete sessions[request.session.sessionId];
  request.session = {};
  response.redirect('/');
  response.status(302);
  response.end();
};

module.exports = { logoutHandler };
