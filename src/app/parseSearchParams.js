const parseSearchParams = (request, response, next) => {
  const { method, uri: { searchParams } } = request;
  if (searchParams && method === 'GET') {
    const params = {};
    const entries = searchParams.entries();

    for (const entry of entries) {
      params[entry[0]] = entry[1];
    }

    request.searchParams = params;
    next();
    return;
  }
  next();
};

module.exports = { parseSearchParams };
