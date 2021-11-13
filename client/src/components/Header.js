import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavItem } from 'react-bootstrap';

const userStorageExists = localStorage.length;
const data = localStorage.getItem("userData");
const object = JSON.parse(data);

const resetStorage = () => {
  localStorage.clear();
  window.location.reload();
}

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Cars and Bids</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userStorageExists > 0 ?
              <div>

              <Nav.Link>
                <i className='fas fa-tachometer'></i> Welcome {object.name}!
              </Nav.Link>

              <LinkContainer to='/dashboard'>
                <Nav.Link>
                  <i className='fas fa-tachometer'></i> Dashboard
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/'>
                <Nav.Link onClick={resetStorage}>
                  <i className='fas fa-user'></i> Logout
                </Nav.Link>
              </LinkContainer>
              
              </div>
              :
              <div>
                <LinkContainer to='/dashboard'>
                <Nav.Link>
                  <i className='fas fa-tachometer'></i> Dashboard
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user'></i> Sign In
                </Nav.Link>
              </LinkContainer>

              </div>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
