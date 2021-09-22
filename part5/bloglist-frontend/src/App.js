import React, { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import Togglable from './components/Togglable';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    // happens if page is refreshed
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const createBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject);
      setBlogs(blogs.concat(blog));

      setSuccessMessage(`a new blog ${blogObject.title} added`);
      setTimeout(() => setSuccessMessage(null), 5000);

      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      // todo notification
    }
  };

  const upvoteBlog = async (blog) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    try {
      await blogService.update(newBlog);

      setBlogs(blogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog)));
    } catch (exception) {
      // todo notification
    }
  };

  const deleteBlog = async (blog) => {
    try {
      const result = window.confirm(`Delete blog ${blog.title}`);
      if (result) {
        await blogService.remove(blog.id);

        setBlogs(blogs.filter((blog_) => blog_.id !== blog.id));
      }
    } catch (exception) {
      // todo notification
    }
  };

  return !user ? (
    <LoginForm setUser={setUser} />
  ) : (
    <div>
      <h1>blogs</h1>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            upvoteBlog={upvoteBlog}
            deleteBlog={deleteBlog}
            blog={blog}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
