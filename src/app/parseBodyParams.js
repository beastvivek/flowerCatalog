const toGuestBookParams = (params) => {
  const bodyParams = {};
  const entries = params.entries();

  for (const entry of entries) {
    bodyParams[entry[0]] = entry[1];
  }

  return bodyParams;
};

const parseBodyParams = (request, response, next) => {
  let data = '';
  request.on('data', (chunk) => {
    data += chunk;
  });
  request.on('end', () => {
    request.bodyParams = toGuestBookParams(new URLSearchParams(data));
    next();
  });
};

module.exports = { parseBodyParams };
