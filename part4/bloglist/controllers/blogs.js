const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post('/', (request, response) => {
  const { author, title, url, likes } = request.body;

  if (!title && !url) {
    return response.status(400).end();
  }

  const blogObject = {
    author: author || '',
    title: title || '',
    url: url || '',
    likes: likes || 0,
  };
  const blog = new Blog(blogObject);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

blogsRouter.delete('/:id', async (request, response) => {
  await blog.delete(request.params.id);

  response.status(204).end();
});

module.exports = blogsRouter;
