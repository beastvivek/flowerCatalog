const injectSession = (userSessions) => (request, response, next) => {
  if (!request.cookies) {
    next();
    return;
  }

  const { id } = request.cookies;
  if (!userSessions[id] && !request.cookies.id) {
    next();
    return;
  }

  request.session = userSessions[id];
  next();
};

module.exports = { injectSession };
