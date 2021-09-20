const bcrypt = require('bcrypt');
const supertest = require('supertest');

const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('creation succeeds with a fresh username', async () => {
    await api
      .post('/api/users')
      .send(helper.validUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('creation fails when username is already in use', async () => {
    const usersAtStart = await Blog.find({});

    await api.post('/api/users').send(helper.validUser);

    const response = await api
      .post('/api/users')
      .send(helper.validUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('`username` to be unique');

    const usersAtEnd = await Blog.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails when username is not at least three characters long', async () => {
    const usersAtStart = await Blog.find({});

    const response = await api
      .post('/api/users')
      .send(helper.userWithInvalidUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain(
      'is shorter than the minimum allowed length'
    );

    const usersAtEnd = await Blog.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails when password is not at least three characters long', async () => {
    const usersAtStart = await Blog.find({});

    const response = await api
      .post('/api/users')
      .send(helper.userWithInvalidPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain(
      'Password must be at least 3 characters long'
    );

    const usersAtEnd = await Blog.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
