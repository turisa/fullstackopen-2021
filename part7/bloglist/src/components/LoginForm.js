import React, { useState } from 'react';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    const userObject = { username, password };
    login(userObject);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
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
