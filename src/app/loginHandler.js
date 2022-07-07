const loginTemplate = () => `<html>

<head>
  <title>Login page</title>
</head>

<body>
    <header>
      <h2>Login</h2>
    </header>

    <form action="/login" method="POST">
      <div>
        <div>
        <label for="username">Username</label>
        <input type="text" name="username" id="name" placeholder="Enter name" required>
        </div>

        <div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Enter password" required>
        </div>
      </div>

      <div class="login-button">
        <input type="submit" value="Login">
      </div>

    </form>
</body>

</html>`;

const createSession = (username, password) => {
  const date = new Date();
  return { sessionId: date.getTime(), username, password };
};

const isValidUser = (username, password) => {
  const users = [
    { username: 'vivek', password: 'ek' },
    { username: 'gayatri', password: 'three' }
  ];

  return users.find((user) => {
    return user.username === username && user.password === password;
  });
};

const loginHandler = (sessions) => (request, response, next) => {
  const { method, url: { pathname }, bodyParams: { username, password } } = request;

  if (pathname === '/login' && method === 'POST') {
    const session = createSession(username, password);
    sessions[session.sessionId] = session;

    if (!isValidUser(username, password)) {
      response.statusCode = 401;
      response.end('Unauthorized User');
      return;
    }

    response.setHeader('set-cookie', `id=${session.sessionId}`);
    response.statusCode = 302;
    response.setHeader('location', '/guestbook');
    response.end();
    return;
  }

  if (pathname === '/login' && method === 'GET') {
    response.setHeader('content-type', 'text/html');
    response.end(loginTemplate());
    return;
  }
  next();
};

module.exports = { loginHandler };