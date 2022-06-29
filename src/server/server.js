const http = require('http');

const startServer = (port, handle) => {
  const server = http.createServer((request, response) => {
    const host = request.headers.host;
    const url = request.url;
    request.url = new URL(`http://${host}${url}`);
    handle(request, response);
  });
  server.listen(port, () => console.log(`Listening to the port ${port}`));
};

const httpServer = (handle, port) => {
  startServer(handle, port);
};

module.exports = { httpServer };
