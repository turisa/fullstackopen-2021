import React from 'react';

const UserDetail = ({ user }) => {
  return user ? (
    <div>
      <h1>{user.name}</h1>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default UserDetail;
