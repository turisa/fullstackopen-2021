import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Navbar from './components/Navbar';

import { initializeBlogs } from './reducers/blogsReducer';
import { loadUserFromWindow } from './reducers/userReducer';
import Users from './components/Users';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(loadUserFromWindow());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      {user ? <Navbar /> : null}
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/blogs" /> : <LoginForm />}
        </Route>
        <Route path="/blogs">
          {user ? <Blogs /> : <Redirect to="/login" />}
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
