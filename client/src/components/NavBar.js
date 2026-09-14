import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './NavBar.css';

function NavBar({ apiStatus }) {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🏈 NFL Fantasy Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/news">
              News
            </Nav.Link>
            <Nav.Link as={Link} to="/games">
              Games
            </Nav.Link>
            <Nav.Link as={Link} to="/players">
              Players
            </Nav.Link>
            <Nav.Link as={Link} to="/teams">
              Teams
            </Nav.Link>
            <Nav.Link as={Link} to="/fantasy">
              Fantasy
            </Nav.Link>
            <Nav.Link className="ms-3">
              <span className={`status-indicator ${apiStatus}`}></span>
              {apiStatus === 'connected' ? 'Connected' : apiStatus === 'checking' ? 'Checking...' : 'Offline'}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
