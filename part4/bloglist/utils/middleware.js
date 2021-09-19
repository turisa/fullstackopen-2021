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

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  request['token'] =
    authorization && authorization.toLowerCase().startsWith('bearer ')
      ? authorization.substring(7)
      : null;

  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
