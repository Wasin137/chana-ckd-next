import React from 'react'
import { Nav, NavLink, NavbarBrand, NavbarCollapse, NavbarToggle } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Image from 'next/image'

export default function Appbar() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <NavbarBrand href='/'>
            <Image src='/lightbulb.svg' alt='logo' width={32} height={32} className='mx-2'/>
            Moji CDSS
          </NavbarBrand>
          <NavbarToggle aria-controls='navbar-menu'/>
          <NavbarCollapse id='navbar-menu'>
            <Nav className='me-auto'>
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/rec'>CKD (CDSS)</NavLink>
            <NavLink href='/viewcomments'>Comment</NavLink>
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  )
}
