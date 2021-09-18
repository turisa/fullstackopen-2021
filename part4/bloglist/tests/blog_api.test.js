const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

describe('when there are several blogs in db', () => {
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

  test('a blog can be deleted', async () => {
    const blogObject = {
      title: 'Too Clean?',
      author: 'Robert C. Martin',
      url: 'https://blog.cleancoder.com/uncle-bob/2018/08/13/TooClean.html',
      likes: 2,
    };

    const response = await api.post('/api/blogs').send(blogObject);
    const blogToDelete = response.body;

    await api.delete(`/api/blogs/${blogToDelete.id}`);
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const username = 'bob123';
    const passwordHash = await bcrypt.hash('secret', 10);

    const user = new User({ username, passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const newUser = {
      username: 'alise123',
      name: 'Alise',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('creation fails when username is already in use', async () => {
    const usersAtStart = await Blog.find({});

    const newUser = {
      username: 'bob123',
      name: 'Boban',
      password: 'secret',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toContain('`username` to be unique');

    const usersAtEnd = await Blog.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails when username is not at least three characters long', async () => {
    const usersAtStart = await Blog.find({});

    const invalidUser = {
      username: 'ab',
      name: 'Bob',
      password: 'secret',
    };

    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    console.log(response.body.error);

    expect(response.body.error).toContain(
      'is shorter than the minimum allowed length'
    );

    const usersAtEnd = await Blog.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails when password is not at least three characters long', async () => {
    const usersAtStart = await Blog.find({});

    const invalidUser = {
      username: 'abcdef',
      name: 'Bob',
      password: '12',
    };

    const response = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    console.log(response.body.error);

    expect(response.body.error).toContain(
      'Password must be at least 3 characters long'
    );

    const usersAtEnd = await Blog.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
