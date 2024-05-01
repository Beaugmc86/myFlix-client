import React, {useState} from "react";
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  }

  return (
    <Navbar bg="primary" expand="lg" fixed="top" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  Logout
                </Nav.Link>
                <Form>
                  <div className="d-flex align-items-center justify-content-end">
                    <FormControl className="mr-sm-2"
                      type="text" 
                      placeholder="Search"
                      id="searchForm"
                      onChange={handleChange}
                      aria-label="Search"
                    />
                  </div>         
                </Form>
              </>
            )}
          </Nav>            
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};