const createRouter = (handlers) => {
  return (request, response) => {
    return handlers.some((handler) => handler(request, response));
  };
};

module.exports = { createRouter };
