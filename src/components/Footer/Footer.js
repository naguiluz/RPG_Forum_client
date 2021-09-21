import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// removed Link import below
import { NavLink } from 'react-router-dom'
import '../Header/HeaderFooter.scss'
import { ReactComponent as Fantasy } from './fantasy.svg'

const authenticatedOptions = (
  <Fragment>
    <NavLink
      to='/change-pw/'
      style={{ color: '#ffffff', textDecoration: 'none' }}
      className='nav-link'>Change Password
    </NavLink>
    <NavLink
      to='/sign-out'
      style={{ color: '#ffffff', textDecoration: 'none' }}
      className='nav-link'>Sign Out
    </NavLink>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
  </Fragment>
)

const Footer = ({ user }) => (
  <Navbar bg='dark' variant='dark' expand='md' fixed='bottom' class='footer'>
    <Navbar.Brand>
      <Fantasy width='30' height='30' />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
        {user && (
          <span
            className='navbar-text mr-2'
            style={{ color: '#ffffff', textDecoration: 'none' }}>Welcome, {user.email}
          </span>
        )}
        {alwaysOptions}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Footer
