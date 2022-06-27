const parseRequestLine = (line) => {
  const [method, uri, httpVersion] = line.split(' ');
  return { method, uri, httpVersion };
};

const parseHeader = (line) => {
  const indexOfSeparator = line.indexOf(':');
  const name = line.slice(0, indexOfSeparator).toLowerCase();
  const value = line.slice(indexOfSeparator + 1).trim();
  return { name, value };
};

const parseHeaders = (lines) => {
  let index = 0;
  const headers = {};
  while (index < lines.length && lines[index].length > 0) {
    const { name, value } = parseHeader(lines[index]);
    headers[name] = value;
    index++;
  }
  return headers;
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\r\n');
  const requestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return { ...requestLine, headers };
};

module.exports = { parseRequest };
