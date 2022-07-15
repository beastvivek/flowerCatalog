const parseBodyParams = (request, response, next) => {
  request.bodyParams = request.body;
  next();
};

module.exports = { parseBodyParams };
