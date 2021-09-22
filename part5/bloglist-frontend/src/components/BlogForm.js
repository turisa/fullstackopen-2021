import React, { useState } from 'react';

import blogService from '../services/blogs';
import Notification from './Notification';

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(blog));

      setSuccessMessage(`a new blog ${title} added`);
      setTimeout(() => setSuccessMessage(null), 5000);

      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      // todo notification
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <div>
      <h1>create new</h1>
      <Notification successMessage={successMessage} />
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          ></input>
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
