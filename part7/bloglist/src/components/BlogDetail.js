import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogsReducer';
import { useHistory, useParams } from 'react-router';

import { commentBlog } from '../reducers/blogsReducer';

const BlogDetail = () => {
  const [comment, setComment] = useState('');
  const history = useHistory();

  const user = useSelector((store) => store.user);
  const blogs = useSelector((store) => store.blogs);

  const blogId = useParams().id;
  const blog = blogs.find((blog) => blog.id === blogId);

  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = () => {
    const confirm = window.confirm(`delete ${blog.title}?`);

    if (confirm) {
      dispatch(deleteBlog(blog));

      history.push('/blogs');
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const addComment = (event) => {
    event.preventDefault();

    dispatch(commentBlog(blog.id, comment));

    setComment('');
  };

  const showIfAddedByUser = {
    display: blog.user.username === user.username ? '' : 'none',
  };

  return blog ? (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} <button onClick={handleLike}>Like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <button style={showIfAddedByUser} onClick={handleDelete}>
        delete
      </button>
      <h1>comments</h1>
      <form onSubmit={addComment}>
        <input type="text" onChange={handleCommentChange} value={comment} />

        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default BlogDetail;
