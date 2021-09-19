const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  switch (error.name) {
    case 'JsonWebTokenError':
      return response.status(400).json({ error: 'invalid token' });
    case 'TokenExpiredError':
      return response.status(401).json({ error: 'token expired' });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
