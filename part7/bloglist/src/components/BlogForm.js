import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createBlog } from '../reducers/blogsReducer';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();

    dispatch(createBlog({ title, author, url }));

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
        <button id="createBlogButton" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
