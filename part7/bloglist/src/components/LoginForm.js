import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../reducers/userReducer';
import Notification from './Notification';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(login(username, password));
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <h1>Log in to application</h1>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={handleUsernameChange}
          ></input>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={handlePasswordChange}
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
