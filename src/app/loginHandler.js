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
    </form>
      
    <a class="signup" href="/signup">
      <div class="button">Sign Up</div>
    </a>
    
    <div class="message __CLASS__">__MESSAGE__</div>
  </body>

</html>`;

const createSession = (username, password) => {
  const date = new Date();
  return { sessionId: date.getTime(), username, password };
};

const isValidUser = (users, username, password) => {
  for (const user in users) {
    const currentUser = users[user];
    if (currentUser.username === username && currentUser.password === password) {
      return true;
    }
  }
  return false;
};

const notValidUser = (response) => {
  let template = loginTemplate().replace('__MESSAGE__', 'Please enter valid username and password');
  const htmlPage = template.replace('__CLASS__', '');
  response.statusCode = 401;
  response.set('content-type', 'text/html');
  response.end(htmlPage);
};

const getLoginHandler = (request, response) => {
  const { searchParams: { message } } = request;
  response.set('content-type', 'text/html');
  let loginMessage = '';
  if (message) {
    loginMessage = message;
  }
  const template = loginTemplate().replace('__MESSAGE__', loginMessage);
  const htmlPage = template.replace('__CLASS__', 'green');
  response.end(htmlPage);
};

const postLoginHandler = (sessions, users) => (request, response, next) => {
  const { bodyParams: { username, password } } = request;

  const session = createSession(username, password);
  sessions[session.sessionId] = session;

  if (!isValidUser(users, username, password)) {
    notValidUser(response);
    next();
    return;
  }

  response.statusCode = 302;
  response.set('set-cookie', `id=${session.sessionId}`);
  response.set('location', '/guestbook');
  response.end();
};


module.exports = { postLoginHandler, getLoginHandler };
