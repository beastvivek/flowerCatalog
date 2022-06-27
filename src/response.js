const statusMessages = {
  200: 'OK',
  404: 'Not Found',
  301: 'Permanent Redirection',
  302: 'Temporary Redirection'
};

const EOL = '\r\n';

class Response {
  #socket;
  #statusCode;
  #headers;
  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  addHeader(name, value) {
    this.#headers[name.toLowerCase()] = value;
  }

  #writeHeaders() {
    Object.entries(this.#headers).forEach(([name, value]) => {
      this.#socket.write(`${name}: ${value}${EOL}`);
    });
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  get statusCode() {
    return this.#statusCode;
  }

  send(content) {
    const statusMessage = statusMessages[this.#statusCode];
    this.addHeader('content-length', content.length);
    this.#socket.write(`HTTP/1.1 ${this.#statusCode} ${statusMessage}${EOL}`);
    this.#writeHeaders();
    this.#socket.write(`${EOL}`);
    this.#socket.write(content);
    this.#socket.end();
  }
}

module.exports = { Response };
