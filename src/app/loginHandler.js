const loginTemplate = () => `<html>

<head>
  <title>Login page</title>
  <link rel="stylesheet" href="css/styles.css">
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

      <div class="unauthorized">__MESSAGE__</div>

    </form>
</body>

</html>`;

const createSession = (username, password) => {
  const date = new Date();
  return { sessionId: date.getTime(), username, password };
};

const isValidUser = (users, username, password) => {
  return users.find((user) => {
    return user.username === username && user.password === password;
  });
};

const loginHandler = (sessions, users) => (request, response, next) => {
  const { method, url: { pathname }, bodyParams: { username, password } } = request;

  if (pathname === '/login' && method === 'POST') {
    const session = createSession(username, password);
    sessions[session.sessionId] = session;

    if (!isValidUser(users, username, password)) {
      response.statusCode = 401;
      const htmlPage = loginTemplate().replace('__MESSAGE__', 'Please enter valid username and password');
      response.end(htmlPage);
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
    const htmlPage = loginTemplate().replace('__MESSAGE__', '');
    response.end(htmlPage);
    return;
  }
  next();
};

module.exports = { loginHandler };
