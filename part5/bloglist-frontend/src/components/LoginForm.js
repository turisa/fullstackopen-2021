import React, { useState } from 'react';
import loginService from '../services/login';
import Notification from './Notification';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      setUsername('');
      setPassword('');

      setUser(user); // causes this LoginForm to unmount
    } catch (exception) {
      setNotification({
        message: 'invalid username or password',
        type: 'error',
      });
      setTimeout(() => setNotification(null), 5000);
    }
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
      <Notification notification={notification} />
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
