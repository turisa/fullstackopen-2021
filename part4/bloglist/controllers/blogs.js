const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.put('/:id', async (request, response) => {
  const blogObject = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: blogObject.likes },
    { new: true }
  );

  response.json(updatedBlog);
});

blogsRouter.post('/', async (request, response) => {
  const { author, title, url, likes } = request.body;

  if (!title && !url) {
    return response.status(400).end();
  }

  //assign any user (for now)
  const user = await User.findOne({});

  const blogObject = {
    author: author || '',
    title: title || '',
    url: url || '',
    likes: likes || 0,
    user: user.id,
  };

  const blog = new Blog(blogObject);
  const result = await blog.save();
  const blogId = result.id;

  user.blogs = user.blogs.concat(blogId);
  await user.save();

  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

module.exports = blogsRouter;
