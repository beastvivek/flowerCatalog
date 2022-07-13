const signupTemplate = () => `<html>

<head>
  <title>Login page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>

<body>
    <header>
      <h2>Sign Up</h2>
    </header>

    <form action="/signup" method="POST">
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

      <div class="signup-button">
        <input type="submit" value="Sign Up">
      </div>
    </form>
    
  </body>

</html>`;

const postSignupHandler = (request, response, users) => {
  const { bodyParams: { username, password } } = request;
  users[username] = { username, password };
  response.statusCode = 302;
  response.setHeader('location', '/login?message=SignUp+Successful');
  response.end();
};

const getSignupHandler = (response) => {
  response.setHeader('content-type', 'text/html');
  response.end(signupTemplate());
};

const signupHandler = (users) => (request, response, next) => {
  const { method, url: { pathname } } = request;

  if (method === 'GET' && pathname === '/signup') {
    getSignupHandler(response);
    return;
  }

  if (method === 'POST' && pathname === '/signup') {
    postSignupHandler(request, response, users);
    return;
  }

  next();
};

module.exports = { signupHandler };
