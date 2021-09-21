const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.put('/:id', async (request, response) => {
  const { author, title, url, likes } = request.body;

  const blogObject = { author, title, url, likes };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogObject,
    { new: true }
  );

  response.json(updatedBlog);
});

blogsRouter.post('/', async (request, response) => {
  const token = request['token'];
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const { author, title, url, likes } = request.body;

  if (!title && !url) {
    return response.status(400).end();
  }

  const blogObject = {
    author: author || '',
    title: title || '',
    url: url || '',
    likes: likes || 0,
    user: decodedToken.id,
  };

  const blog = new Blog(blogObject);
  const result = await blog.save();
  const blogId = result.id;

  user.blogs = user.blogs.concat(blogId);
  await user.save();

  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blogToDelete = await Blog.findById(request.params.id);

  if (!blogToDelete) {
    return response.status(404).json({ error: 'blog does not exist' });
  }

  const user = await User.findById(decodedToken.id);

  if (!user._id.toString() === blogToDelete.user.toString()) {
    return response.status(401).json({ error: 'user is not the creator' });
  }

  await Blog.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

module.exports = blogsRouter;
