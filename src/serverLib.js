const { createServer } = require('net');
const { parseRequest } = require('./parser.js');
const { Response } = require('./response.js');

const onConnection = (socket, handle) => {
  socket.on('error', () => { });
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk.toString());
    const response = new Response(socket);
    console.log(request.method, request.uri, request.httpVersion);
    return handle(request, response);
  });
};

const startServer = (handle, port) => {
  const server = createServer((socket) => onConnection(socket, handle));
  server.listen(port, () => console.log(`Listening to the port ${port}`));
};

module.exports = { startServer };
