const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');

const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

describe('when there are 5 blogs in db and no authenticated users', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
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

  test('creation will fail if a token is missing', async () => {
    await api.post('/api/blogs').send(helper.validBlog).expect(401);
  });

  test('creation will fail if a token is invalid', async () => {
    await api
      .post('/api/blogs')
      .send(helper.validBlog)
      .set('Authorization', 'InvalidToken')
      .expect(401);
  });
});

describe('when a user is authenticated with a valid token', () => {
  let loginToken;

  beforeEach(async () => {
    await Blog.deleteMany({});

    await User.deleteMany({});
    await api.post('/api/users').send(helper.validUser);

    const response = await api.post('/api/login').send(helper.validLogin);
    loginToken = response.body.token;
  });

  test('creation will succeed', async () => {
    await api
      .post('/api/blogs')
      .send(helper.validBlog)
      .set('Authorization', `bearer ${loginToken}`)
      .expect(201);
  });

  test('if if the likes property is missing from the request, it will default to 0', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.blogWithoutLikes)
      .set('Authorization', `bearer ${loginToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test('if the title and url properties are missing from the request data, the backend responds with status 400', async () => {
    await api
      .post('/api/blogs')
      .send(helper.invalidBlog)
      .set('Authorization', `bearer ${loginToken}`)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
