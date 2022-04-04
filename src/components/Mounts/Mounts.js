//dependencies
import axios from "axios";
import React from "react";
import { useState } from "react";
import apiUrl from "../../apiUrl";
import "./Mounts.css";

//image imports to use instead of true and false
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
  Modal,
} from "react-bootstrap";

function Mounts() {
  // **USESTATE DECLARATIONS**
    // all mounts for all characters
  const [allPlayer, setAllPlayer] = useState([]);
    // all mounts for a characters
  const [singlePlayer, setSinglePlayer] = useState([]);
    // toggles between displaying all guildmembers and a single member
  const [display, setDisplay] = useState(null);
    // handles form input for single character search
  const [formName, setFormName] = useState("");
    // state that handles filtered options
  const [mount, setMount] = useState("all");

  // **HANDLER FUNCTIONS**
    //form input state and handler
  const handleChange = ({ currentTarget: input }) => {
    setFormName({ ...formName, [input.name]: input.value});
  };

    //handles filter input 
  const handleSelect = (eventKey) => {
    this.setFiltered({eventKey})
  }

  // ** API CALLS**
    //call to the API to get all Players and sets display to all characters
  function getAllPlayers() {
      setDisplay(true)
    axios
      .get(`${apiUrl}` + "/player/find")
      .then((data) => setAllPlayer(data.data.Characters))
      .catch((error) => console.log(error));
  }
  
    //call to the API to get a single player and sets display to single character
  function getPlayer(formName) {
      setDisplay(false)
    axios
      .get(`${apiUrl}` + "/player/find/" + formName)
      .then((data) => setSinglePlayer(data.data.Character))
      .catch((error) => console.log(error))
  }

  // **DATA MAPPING AND DISPLAY**
    //map through the player list to display character + mounts for all characters
  let allPlayerDisplay;
  if (allPlayer.length > 0) {
    allPlayerDisplay = allPlayer.map((player, index) => {
      if (player.is_active) {
        const ponyNames = Object.keys(player.pony);
        const ponyValues = Object.values(player.pony);
        const birdNames = Object.keys(player.bird);
        const birdValues = Object.values(player.bird);
        return (
            <div key={index}>
            <h1>{player.name}</h1>
          {/* display table for pony */}
          <div style={{display: mount=== "pony" || mount==="all" ? "inline" : "none"}}>
          <Table className="Pony" responsive>
            <thead>
              <tr>
                <th>Ponies</th>
                  {ponyNames.map(key => (<th>{key.toUpperCase()}</th>))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ARR</td>
                {ponyValues.map(value => (<td>{(value ? <img className="icon" src={yes} alt="yes"/> : <img className="icon" src={no} alt="no"/> )}</td>))}
              </tr>
            </tbody>
          </Table>
          </div>

          {/* displays table for birds */}
          <div style={{display: mount=== "bird" || mount==="all" ? "inline" : "none"}}>
          <Table className="Bird" responsive>
            <thead>
              <tr>
                <th>Birds</th>
                  {birdNames.map(key => (<th>{key.toUpperCase()}</th>))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HW</td>
                {birdValues.map(value => (<td>{(value ? <img className="learned_icon" src={yes} alt="yes"/> : <img className="learned_icon" src={no} alt="no"/> )}</td>))}
              </tr>
            </tbody>
          </Table>
          </div>
          </div>
        );
      }
    });
  }

  //making display for each individual character's list of selected mount
  let singlePlayerDisplay;
  let singlePlayerArray = [singlePlayer]
    singlePlayerDisplay = singlePlayerArray.map((player, index) => {
      if (player.is_active) {
        const ponyNames = Object.keys(player.pony);
        const ponyValues = Object.values(player.pony);
        const birdNames = Object.keys(player.bird);
        const birdValues = Object.values(player.bird);

        return (
            <div>
            <h1>{player.name}</h1>
          {/* display table for pony */}
          <div style={{display: mount=== "pony" || mount==="all" ? "inline" : "none"}}>
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
                {ponyValues.map(value => (<td>{(value ? <img className="icon" src={yes} alt="yes"/> : <img className="icon" src={no} alt="no"/> )}</td>))}
              </tr>
            </tbody>
          </Table>
          </div>

          {/* displays table for birds */}
          <div style={{display: mount=== "bird" || mount==="all" ? "inline" : "none"}}>
          <Table responsive>
            <thead>
              <tr>
                <th>Birds</th>
                  {birdNames.map(key => (<th>{key.toUpperCase()}</th>))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HW</td>
                {birdValues.map(value => (<td>{(value ? <img className="learned_icon" src={yes} alt="yes"/> : <img className="learned_icon" src={no} alt="no"/> )}</td>))}
              </tr>
            </tbody>
          </Table>
          </div>
          </div>
        );
      } else {
          return(
            <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>WARNING!</Modal.Title>
            </Modal.Header>
          
            <Modal.Body>
              <p>Selected Player is currently <i>NOT</i> an active player.</p>
            </Modal.Body>
          </Modal.Dialog>
          )
      }
    });
    
  // **MAIN RETURN**
  return (
    <div>
      <h1>Mounts Test</h1>
      {/* search and filter bar */}
      <ButtonToolbar className="mb-3" aria-label="selecting display elements">
        <DropdownButton
          as={ButtonGroup}
          title="Mount"
          id="bg-nested-dropdown"
          variant="secondary"
        >
          <Dropdown.Item eventKey="all" onClick={() => setMount("all")}>All</Dropdown.Item>
          <Dropdown.Item eventKey="pony" onClick={() => setMount("pony")}>Ponies</Dropdown.Item>
          <Dropdown.Item eventKey="bird" onClick={() => setMount("bird")}>Birds</Dropdown.Item>
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

      {/* what actually is printed on the screen */}
    {display === true && <div className="all_player">{allPlayerDisplay}</div>}
    {display === false && <div className="single_player">{singlePlayerDisplay}</div>}
    </div>
  );
}

export default Mounts;
