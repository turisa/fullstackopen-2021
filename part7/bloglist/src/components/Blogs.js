import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import BlogForm from './BlogForm';
import Togglable from './Togglable';

const Blogs = () => {
  const blogFormRef = useRef();

  const blogs = useSelector((store) => store.blogs);

  return (
    <div>
      <h1>blogs</h1>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <div id="blogsDiv">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <p>
                {blog.title} {blog.author}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
