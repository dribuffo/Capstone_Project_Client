//dependencies
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import apiUrl from "../../apiUrl";
import "./Add.css";

//component import
import Update from '../Update/Update';

//react bootstrap imports
import {
    ButtonToolbar,
    Button,
    InputGroup,
    FormControl,
  } from "react-bootstrap";

function Add() {
    //state for form for adding new Player
    const [data, setData] = useState({
        name: "",
        is_active: false,
        has_BLU: false,
        blu_spells: {},
        pony: {},
        bird: {},
    });

    //handle change for setting form
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
      };
    
    //API POST call to add new player with default info
    function addPlayer(data){
        fetch(apiUrl + "/player/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
            .then(() => console.log(data))
            .catch((e) => console.log(e));
    }

    //code block for button to route to Update page
    let navigate = useNavigate();
    const routeChange = () => {
        let path = "/update";
        navigate(path)
    }
    

    return(
        <div className="add_page">
        <h1>Add Player Page</h1>
        <h2>Step 1: Add Player by typing name in the empty field and pressing add.</h2>    
        <ButtonToolbar>
          <InputGroup>
            <InputGroup.Text id="btnGroupAddon">
              Add Player: 
            </InputGroup.Text>
            <FormControl
              type="text"
              placeholder="player name"
              name="name"
              aria-label="player name"
              aria-describedby="btnGroupAddon"
              onChange={handleChange}
            />
          </InputGroup>
          <Button variant="info" type="button" onClick={() => addPlayer(data)}>
            Press the Welcome Button!
          </Button>{" "}
        </ButtonToolbar>
            
        <h2>Step 2: Press button below to move to update page to update their information.</h2>
            <Button variant="warning" type="button" onClick={routeChange}>Update New Player Info</Button>
        </div>
    )
}

export default Add;