import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();

    const blogObject = { title, author, url };
    createBlog(blogObject);

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
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            className="titleInput"
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          ></input>
        </div>
        <div>
          author:
          <input
            className="authorInput"
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          ></input>
        </div>
        <div>
          url:{' '}
          <input
            className="urlInput"
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          ></input>
        </div>
        <button id="createBlogButton" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
