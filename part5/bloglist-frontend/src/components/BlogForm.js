import { useState } from 'react';

import blogService from '../services/blogs';
import Notification from './Notification';

const BlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notification, setNotification] = useState(null);

  const handleCreate = async (event) => {
    event.preventDefault();

    const blog = await blogService.create({ title, author, url });
    setBlogs(blogs.concat(blog));

    setNotification({ message: `a new blog ${title} added`, type: 'success' });
    setTimeout(() => setNotification(null), 5000);

    setTitle('');
    setAuthor('');
    setUrl('');
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
      <Notification notification={notification} />
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
