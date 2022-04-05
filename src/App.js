//dependencies
import React, { useState } from 'react';
import { Route, Routes, Link } from "react-router-dom";
import './App.css';

//bootstrap imports
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';

//components import
import Home from "./components/Home/Home";
import BLU from "./components/BLU/BLU";
import Mounts from "./components/Mounts/Mounts";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Singup";
import Update from './components/Update/Update';
import Add from "./components/Add/Add"

//footer links and imports
import guildCrest from "./components/images/crest.png"
import github from "./components/images/github.png"
import linkedin from "./components/images/linkedin.png"
import characterImage from "./components/images/DisplayNameSettings.png"
let guildSite = 'https://na.finalfantasyxiv.com/lodestone/freecompany/9236179148295113228/';
let githubLink = 'https://github.com/dribuffo'
let linkedinLink = 'https://www.linkedin.com/in/danielribuffo/'
let myCharacter = 'https://na.finalfantasyxiv.com/lodestone/character/210852/'

function App() {
  // **USE STATES**

  // **HANDLE FUNCTIONS**
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // **TOKEN**
  const user = localStorage.getItem("token");

  return (
    <div className="App">
      {/* NAVBAR */}
      <Navbar expand="lg" className="color-nav">
        <Container>
          <Navbar.Brand href="/">Lex Talionis Guild Database</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/mounts"}>
                View Mounts
              </Nav.Link>
              <Nav.Link as={Link} to={"/BLU"}>
                View BLUs and Spells
              </Nav.Link>
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={"/update"}>
                  Update Character
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/Login"}>
                  Log In
                </NavDropdown.Item>
                {user ? (<NavDropdown.Divider />) : null}
                {user ? (<NavDropdown.Item as={Link} to={"/add"}>
                  Add new Player
                </NavDropdown.Item>) : null}
                {user ? (<NavDropdown.Item as={Link} to={"/Signup"}>
                  Sign Up
                </NavDropdown.Item>) : null}
                {user ? (
                  <button className="white_btn" onClick={handleLogout}>
                    Logout
                  </button>
                ) : null}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* MAIN DIV USED FOR ROUTES */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />,
          <Route path="/mounts" element={<Mounts />} />,
          <Route path="/BLU" element={<BLU />} />,
          {user && <Route path="/update" element={<Update />} />},
          {user && <Route path="/add" element={<Add />} />},
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
        {/* <div className = "push"></div> */}
      </main>
      {/* FOOTER */}
      <footer>
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Nav.Link href={guildSite}>
              {" "}
              <img className="iFoot" src={guildCrest} alt="guild crest" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={myCharacter}>
              <img
                className="iFoot"
                src={characterImage}
                alt="Zebix Rune of Balmung"
              />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {/* Github icons created by Pixel perfect - Flaticon */}
            <Nav.Link a href={githubLink}>
              <img
                className="iFoot"
                src={github}
                alt="Github icons created by Pixel perfect - Flaticon"
              />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {/* Linkedin icons created by riajulislam - Flaticon */}
            <Nav.Link href={linkedinLink}>
              <img
                className="iFoot"
                src={linkedin}
                alt="Linkedin icons created by riajulislam - Flaticon"
              />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </footer>
    </div>
  );
}

export default App;