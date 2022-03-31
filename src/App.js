//dependencies
import React from 'react';
import { Route, Routes, Link } from "react-router-dom";
import './App.css';

//bootstrap imports
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';

//components import
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import BLU from "./components/BLU/BLU";
import Mounts from "./components/Mounts/Mounts";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Singup";
import Update from './components/Update/Update';


function App() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  const user = localStorage.getItem("token")
  // Put logout button somewhere...
  // <button className="white_btn" onClick={handleLogout}>Logout</button>

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Lex Talionis Guild Database</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/mounts"}>View Mounts</Nav.Link>
              <Nav.Link as={Link} to={"/BLU"}>View BLUs and Spells</Nav.Link>
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={"/update"}>Update Character</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to={"/Signup"}>Sign Up</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/Login"}>Log In</NavDropdown.Item>
                <NavDropdown.Divider />
                <button className="white_btn" onClick={handleLogout}>Logout</button>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
      <Routes>
          <Route path="/" element={<Home />} />,
          <Route path="/mounts" element={<Mounts />} />,
          <Route path="/BLU" element={<BLU />} />,
          {user && <Route path="/update" element={<Update />} />}
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
