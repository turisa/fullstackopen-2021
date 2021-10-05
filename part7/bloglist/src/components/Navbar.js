import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../reducers/userReducer';

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  const padding = {
    padding: 5,
  };

  return (
    <p>
      <Link to="/blogs" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </p>
  );
};

export default Navbar;
