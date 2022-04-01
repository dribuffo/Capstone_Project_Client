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
  //useState declarations
  const [allPlayer, setAllPlayer] = useState([]);
  const [singlePlayer, setSinglePlayer] = useState([]);
  const [display, setDisplay] = useState(null);

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
          <Table responsive>
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
                {ponyValues.map(value => (<td>{(value ? <img className="icon" src={yes} alt="yes"/> : <img className="icon" src={no} alt="no"/> )}</td>))}
              </tr>
            </tbody>
          </Table>
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
