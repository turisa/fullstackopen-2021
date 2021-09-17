const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (request, response) => {
  const blogs = Blog.find({});
  response.json(blogs);
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

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.delete(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
