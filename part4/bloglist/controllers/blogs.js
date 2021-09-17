const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('/', (request, response) => {
  const { author, title, url } = request.body;

  if (!author || !title || !url) {
    return response.status(400).end();
  }

  const blogObject = { author, title, url, likes: likes || 0 };
  const blog = new Blog(blogObject);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogsRouter;
