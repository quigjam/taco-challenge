//import React
import React from "react";
//import some bootstrap components
import { Navbar, Nav } from "react-bootstrap";
export default function Header() {
  //load the header for each page
  return (
    <header>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Navbar.Brand href="/">Taco Central</Navbar.Brand>
        <Nav.Link href="/contributors">Contributors</Nav.Link>
      </Navbar>
    </header>
  );
}
