const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');

const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

describe('when there are 5 blogs in db and a valid user', () => {
  let loginToken;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);

    await User.deleteMany({});
    await api.post('/api/users').send(helper.validUser);

    const response = await api.post('/api/login').send(helper.validLogin);
    loginToken = response.body.token;
  });

  test('the application returns 5 blog posts in the JSON format', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogs = response.body;

    expect(blogs.length).toBe(5);
  });

  test('blogs have a unique identifier named id', async () => {
    const response = await api.get('/api/blogs');
    const blogs = response.body;

    blogs.forEach((blog) => expect(blog.id).toBeDefined());
  });

  test('creation will fail if token is missing', async () => {
    await api.post('/api/blogs').send(helper.validBlog).expect(401);
  });

  test('creation will fail if token is invalid', async () => {
    await api
      .post('/api/blogs')
      .send(helper.validBlog)
      .set('Authorization', 'InvalidToken')
      .expect(401);
  });

  test('creation will succeed if token is valid', async () => {
    await api
      .post('/api/blogs')
      .send(helper.validBlog)
      .set('Authorization', `bearer ${loginToken}`)
      .expect(201);
  });

  // todo if the likes property is missing from the request, it will default to 0
  // todo if the title and url properties are missing from the request data, the backend responds with status 400
  // todo likes of a blog can be updated
  // todo a blog can be deleted
});

afterAll(() => {
  mongoose.connection.close();
});
