const validUser = {
  name: 'Alice',
  username: 'alice',
  password: 'password',
};

const userWithInvalidPassword = {
  name: 'Alice',
  username: 'alice',
  password: 'pa',
};

const userWithInvalidUsername = {
  name: 'Alice',
  username: 'al',
  password: 'password',
};

const validLogin = {
  username: 'alice',
  password: 'password',
};

const validBlog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
};

const invalidBlog = {
  title: '',
  author: 'Uncle Bob',
  url: '',
  likes: 10,
};

const blogWithoutLikes = {
  title: 'What They Thought of Programmers',
  author: 'Uncle Bob',
  url: 'http://blog.cleancoder.com/uncle-bob/2019/11/03/WhatTheyThoughtOfUs.html',
};

const initialBlogs = [
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
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
];

module.exports = {
  validUser,
  validBlog,
  validLogin,
  invalidBlog,
  blogWithoutLikes,
  userWithInvalidPassword,
  userWithInvalidUsername,
  initialBlogs,
};
