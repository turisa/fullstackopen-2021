import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Container,
  Button,
  Navbar as BootstrapNavbar,
  Nav,
} from 'react-bootstrap';

import { logout } from '../reducers/userReducer';

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/blogs">
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
        <BootstrapNavbar.Collapse className="justify-content-end">
          <BootstrapNavbar.Text>Signed in as {user.name}</BootstrapNavbar.Text>
          <Button variant="secondary" onClick={handleLogout}>
            Log out
          </Button>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
