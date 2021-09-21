import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs }) => {
  const [view, setView] = useState(false);

  const buttonLabel = view ? 'hide' : 'view';
  const showWhenView = { display: view ? '' : 'none' };

  const handleToggleView = () => {
    setView(!view);
  };

  const handleUpvote = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    try {
      await blogService.update(newBlog);

      setBlogs(blogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog)));
    } catch (exception) {
      // later
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={handleToggleView}>{buttonLabel}</button>
      </div>
      <div style={showWhenView}>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={handleUpvote}>like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  );
};

export default Blog;
