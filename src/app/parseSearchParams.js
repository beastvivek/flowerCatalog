const parseSearchParams = (request, response, next) => {
  const searchParams = {};
  const entries = request.url.searchParams.entries();

  for (const entry of entries) {
    searchParams[entry[0]] = entry[1];
  }

  request.searchParams = searchParams;
  next();
};

module.exports = { parseSearchParams };
