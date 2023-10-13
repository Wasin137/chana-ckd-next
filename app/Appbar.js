import React from 'react'
import { Nav, NavLink, NavbarBrand, NavbarCollapse, NavbarToggle } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

export default function Appbar() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <NavbarBrand href='/'>
            Moji CKD recommendation
          </NavbarBrand>
          <NavbarToggle aria-controls='navbar-menu'/>
          <NavbarCollapse id='navbar-menu'>
            <Nav className='me-auto'>
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/rec'>Recommendation</NavLink>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  )
}
