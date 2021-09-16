const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');

const mongoUrl = config.MONGODB_URI;

mongoose
  .connect(mongoUrl)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error(error));

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;
