//dependencies
import React from 'react';
import { Route, Routes, Link, Navigate } from "react-router-dom";
import './App.css';

//bootstrap imports
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';

//components import
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer"

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Lex Talionis Guild Database</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">View Mounts</Nav.Link>
              <Nav.Link href="#link">View BLUs & Spells</Nav.Link>
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Update Character</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Log In</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
      <Routes>
          <Route path="/" element={<Home />} />,
          {/* <Route path="/CharacterDisplay" element={<CharacterDisplay />} />,
          <Route path="/CharacterUpdate" element={<CharacterUpdate />} />,
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Spells" element={<Spells />} /> */}
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
