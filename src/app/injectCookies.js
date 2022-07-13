const parseCookies = (cookieString) => {
  const cookies = {};

  if (!cookieString) {
    return cookies;
  }

  cookieString.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookies[name] = value;
  });

  return cookies;
};

const injectCookies = (request, response, next) => {
  if (!request.headers.cookie) {
    next();
    return;
  }

  const { cookie } = request.headers;
  request.cookies = parseCookies(cookie);
  next();
};

module.exports = { injectCookies };
