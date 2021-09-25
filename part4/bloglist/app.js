const cors = require('cors');
const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');

const mongoUrl = config.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error(error));

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use('/api/blogs', middleware.tokenExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
