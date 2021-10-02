import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer';

const App = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  const blogs = useSelector((store) => store);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const login = async (userObject) => {
    try {
      const user = await loginService.login(userObject);

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage('invalid username or password');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const logout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const likeBlog = (blog) => {
    dispatch(likeBlog(blog));
  };

  const deleteBlog = (blog) => {
    const result = window.confirm(`Delete blog ${blog.title}`);
    if (result) {
      dispatch(deleteBlog(blog.id));
    }
  };

  return !user ? (
    <div>
      <h1>Log in to application</h1>
      <Notification errorMessage={errorMessage} />
      <LoginForm login={login} />
    </div>
  ) : (
    <div>
      <h1>blogs</h1>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <p>
        {user.name} logged in <button onClick={logout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm /**createBlog={createBlog}*/ />
      </Togglable>
      <div id="blogsDiv">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              blog={blog}
              user={user}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
