import React, { useState, useEffect, useRef, Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';

import { initializeBlogs } from './reducers/blogsReducer';
import { loadUserFromWindow, logout } from './reducers/userReducer';
import Users from './components/Users';

const App = () => {
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  const blogs = useSelector((store) => store.blogs);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(loadUserFromWindow());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return !user ? (
    <div>
      <h1>Log in to application</h1>
      <Notification />
      <LoginForm />
    </div>
  ) : (
    <div>
      <h1>blogs</h1>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <div id="blogsDiv">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
      <Users />
    </div>
  );
};

export default App;
