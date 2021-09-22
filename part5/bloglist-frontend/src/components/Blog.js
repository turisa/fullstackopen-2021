import React, { useState } from 'react';

const Blog = ({ upvoteBlog, deleteBlog, blog, user }) => {
  const [view, setView] = useState(false);

  const buttonLabel = view ? 'hide' : 'view';
  const showWhenView = { display: view ? '' : 'none' };

  const toggleView = () => {
    setView(!view);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const showIfAddedByUser = {
    display: blog.user.username === user.username ? '' : 'none',
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleView}>{buttonLabel}</button>
      </div>
      <div style={showWhenView}>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={() => upvoteBlog(blog)}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button style={showIfAddedByUser} onClick={() => deleteBlog(blog)}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
