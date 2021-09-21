import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import Notification from './Notification';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);

      setUsername('');
      setPassword('');

      setUser(user); // causes this LoginForm to unmount
    } catch (exception) {
      setErrorMessage('invalid username or password');
      setTimeout(() => setErrorMessage(null), 5000);
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
      <Notification errorMessage={errorMessage} />
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
