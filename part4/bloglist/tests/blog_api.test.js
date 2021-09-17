const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(initialBlogs);
});

test('the application returns the correct amount of blog posts in the JSON format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogs = response.body;
  expect(blogs.length).toBe(initialBlogs.length);
});

test('blogs have a unique identifier named id', async () => {
  const response = await api.get('/api/blogs');
  const blogs = response.body;

  blogs.forEach((blog) => expect(blog.id).toBeDefined());
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const blogs = response.body;

  expect(blogs.length).toBe(initialBlogs.length + 1);
});

test('if the likes property is missing from the request, it will default to 0', async () => {
  const newBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  };

  const response = await api.post('/api/blogs').send(newBlog);
  const blog = response.body;

  expect(blog.likes).toBe(0);
});

test('if the title and url properties are missing from the request data, the backend responds with status 400', async () => {
  const newBlog = {
    author: 'Robert C. Martin',
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

test('likes of a blog can be updated', async () => {
  let response;

  const blogObject = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  };

  response = await api.post('/api/blogs').send(blogObject);
  const blogToUpdate = response.body;

  const newBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

  response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog);
  const updatedBlog = response.body;

  expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1);
});

afterAll(() => {
  mongoose.connection.close();
});
