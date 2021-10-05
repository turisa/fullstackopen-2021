import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import userService from '../services/users';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then((result) => {
      setUsers(result);
    });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
