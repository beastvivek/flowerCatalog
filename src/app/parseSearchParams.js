const parseSearchParams = (request, response, next) => {
  request.searchParams = request.query;
  next();
};

module.exports = { parseSearchParams };
