import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'
import './HeaderFooter.scss'

const authenticatedOptions = (
  <Fragment>
    {/* <NavLink to='/change-pw/' className='nav-link'>Change Password</NavLink>
    <NavLink to='/sign-out' className='nav-link'>Sign Out</NavLink> */}
    <NavLink to='/create-world/'>
      <button
        type='button'
        className='btn btn-secondary btn-lg'
        id='create-btn'>
        Ignite a World
      </button>
    </NavLink>
    <NavLink to='/worlds/'>
      <button
        type='button'
        className='btn btn-secondary btn-lg'
        id='index-btn'>
        Scry Known Worlds
      </button>
    </NavLink>
    <NavLink to='/create-character/'>
      <button
        type='button'
        className='btn btn-secondary btn-lg'
        id='create-char-btn'>
        Sculpt a Character
      </button>
    </NavLink>
    <NavLink to='/characters/'>
      <button
        type='button'
        className='btn btn-secondary btn-lg'
        id='index-btn'>
        Summon Loyal Adventurers
      </button>
    </NavLink>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavLink to='/sign-up' className='nav-link'>Sign Up</NavLink>
    <NavLink to='/sign-in' className='nav-link'>Sign In</NavLink>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg='dark' variant='dark' expand='md'>
    <Navbar.Brand>
      <Link to='/' style={{ color: '#ffffff', textDecoration: 'none' }}>RPGenerator</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
        {/* {user && (
          <span className='navbar-text mr-2'>Welcome, {user.email}</span>
        )} */}
        {alwaysOptions}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
