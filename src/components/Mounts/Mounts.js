//dependencies
import axios from "axios";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import apiUrl from "../../apiUrl";
import "./Mounts.css";

//image imports
import yes from "../images/Check.png"
import no from "../images/Close.png"

//react bootstrap
import {
  Button,
  ButtonToolbar,
  ButtonGroup,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
  Table,
} from "react-bootstrap";

function Mounts() {
  const [allPlayer, setAllPlayer] = useState([]);
  const [singlePlayer, setSinglePlayer] = useState([]);
  const [display, setDisplay] = useState(null)

  //form input state and handler
  const [formName, setFormName] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setFormName({ ...formName, [input.name]: input.value});
  };

  //call to the API to get all Players
  function getAllPlayers() {
      setDisplay(true)
    axios
      .get(`${apiUrl}` + "/player/find")
      .then((data) => setAllPlayer(data.data.Characters))
      .catch((error) => console.log(error));
  }
  
  //call to the API to get a single player
  function getPlayer(formName) {
      setDisplay(false)
    axios
      .get(`${apiUrl}` + "/player/find/" + formName)
      .then((data) => setSinglePlayer(data.data.Character))
      .catch((error) => console.log(error))
  }
  console.log(singlePlayer)

//   useEffect to prevent infinite looping
//   useEffect(() => {
//     getPlayer(formName)
//   },[])

  //map through the player list to display character + mounts for all characters
  let allPlayerDisplay;
  if (allPlayer.length > 0) {
    //   setDisplay(true)
    allPlayerDisplay = allPlayer.map((player, index) => {
      if (player.is_active) {
        const ponyNames = Object.keys(player.pony);
        const ponyValues = Object.values(player.pony);
        return (
            <div>
            <h1>{player.name}</h1>
          <Table responsive key={index}>
            <thead>
              <tr>
                <th>Ponies</th>
                  {ponyNames.map(key => (<th>{key.toUpperCase()}</th>))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ARR</td>
                {ponyValues.map(value => (<td>{(value ? <img className="learned_icon" src={yes} alt="yes"/> : <img className="learned_icon" src={no} alt="no"/> )}</td>))}
              </tr>
            </tbody>
          </Table>
          </div>
        );
      }
    });
  }

  //making display for each individual character's list of selected mount
  let singlePlayerDisplay;
  let singlePlayerArray = [singlePlayer]
    singlePlayerDisplay = singlePlayerArray.map((player, index) => {
        // setDisplay(false)
      if (player.is_active) {
        const ponyNames = Object.keys(player.pony);
        const ponyValues = Object.values(player.pony);
        return (
            <div>
            <h1>{player.name}</h1>
          <Table responsive key={index}>
            <thead>
              <tr>
                <th>Ponies</th>
                  {ponyNames.map(key => (<th>{key.toUpperCase()}</th>))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ARR</td>
                {ponyValues.map(value => (<td>{value.toString()}</td>))}
              </tr>
            </tbody>
          </Table>
          </div>
        );
      } else if(singlePlayerArray > 0 && player.is_active === false) {
          return <div>Player not active</div>
      }
    });

  return (
    <div>
      <h1>Mounts Test</h1>
      <ButtonToolbar className="mb-3" aria-label="selecting display elements">
        <DropdownButton
          as={ButtonGroup}
          title="Mount"
          id="bg-nested-dropdown"
          variant="secondary"
        >
          <Dropdown.Item eventKey="pony">Ponies</Dropdown.Item>
          <Dropdown.Item eventKey="bird">Birds</Dropdown.Item>
        </DropdownButton>
        <ButtonGroup className="me-2" aria-label="player selector">
          <Button variant="info" onClick={getAllPlayers}>
            Get all guildmembers
          </Button>{" "}
          <Button variant="outline-info" onClick={() => getPlayer(formName.name)}>
            Get specific player
          </Button>{" "}
        </ButtonGroup>
        <InputGroup>
          <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
          <FormControl
            type="text"
            placeholder="player name"
            name="name"
            aria-label="player name"
            aria-describedby="btnGroupAddon"
            onChange={handleChange}
          />
        </InputGroup>
      </ButtonToolbar>
      {display === true && <div className="all_player">{allPlayerDisplay}</div>}
     {display === false && <div className="single_player">{singlePlayerDisplay}</div>}
    </div>
  );
}

export default Mounts;
