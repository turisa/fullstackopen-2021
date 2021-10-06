import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Blogs from './components/Blogs';
import BlogDetail from './components/BlogDetail';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';

import { initializeBlogs } from './reducers/blogsReducer';
import { loadUserFromWindow } from './reducers/userReducer';
import Users from './components/Users';
import UserDetail from './components/UserDetail';
import { initializeUsers } from './reducers/usersReducer';

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const users = useSelector((store) => store.users);
  const blogs = useSelector((store) => store.blogs);

  const userMatch = useRouteMatch('/users/:id');
  const blogMatch = useRouteMatch('/blogs/:id');

  const userToShow = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogToShow = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  useEffect(() => {
    dispatch(loadUserFromWindow());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      {user ? <Navbar /> : null}
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/blogs" /> : <LoginForm />}
        </Route>
        <Route path="/blogs/:id">
          {user ? <BlogDetail /> : <Redirect to="/login" />}
        </Route>
        <Route path="/blogs">
          {user ? <Blogs /> : <Redirect to="/login" />}
        </Route>
        <Route path="/users/:id">
          {user ? <UserDetail user={userToShow} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
