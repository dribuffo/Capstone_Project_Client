//dependencies
import React from "react";
import axios from "axios";
import { useState } from "react";
import apiUrl from "../../apiUrl";
import "./BLU.css";

//image imports to use instead of true and false:
import yes from "../images/Check.png"
import no from "../images/Close.png"

//react bootstrap imports
import {
  Button,
  ButtonToolbar,
  ButtonGroup,
  InputGroup,
  FormControl,
  Table,
  Modal,
} from "react-bootstrap";

function BLU() {
    // **USESTATE DECLARATIONS**
    // all blue mages
  const [allBLUs, setAllBLUs] = useState([]);
  // a single blue mage
  const [singleBLU, setSingleBLU] = useState({});
  // toggle between group and single display
  const [display, setDisplay] = useState(null);
  // for the modals
  const [show, setShow] = useState(false);
  // form input state 
  const [formName, setFormName] = useState("");

    // **HANDLER FUNCTIONS**
  //form handler functions
  const handleChange = ({ currentTarget: input }) => {
    setFormName({ ...formName, [input.name]: input.value });
  };
  //modal handler functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // ** API CALLS**
  //call to the API to get all Players
  function getAllBLUs() {
      setDisplay(true)
    axios
      .get(`${apiUrl}` + "/player/find")
      .then((data) => setAllBLUs(data.data.Characters))
      .catch((error) => console.log(error));
  }

  //call to the API to get a single player
  function getOneBLU(formName) {
      setDisplay(false)
    axios
      .get(`${apiUrl}` + "/player/find/" + formName)
      .then((data) => setSingleBLU(data.data.Character))
      .catch((error) => console.log(error));
  }
  
  // **DATA MAPPING AND DISPLAY**
  //map through the player list to display all BLUs and their spell list
  let allPlayerDisplay;
  if (allBLUs.length > 0) {
    allPlayerDisplay = allBLUs.map((player, index) => {
      if (player.has_BLU) {
        const spellNames = Object.keys(player.blu_spells);
        const spellValues = Object.values(player.blu_spells);
        return (
          <div key={index}>
            <h1>{player.name}</h1>
            <Table size="sm" responsive className="Table">
              <thead>
                <tr>
                  <th>Spell Name:</th>
                  {spellNames.map((key) => (<th>{key.toUpperCase()}</th>))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Learned?</td>
                  {spellValues.map((value) => (<td>{(value ? <img className="learned_icon" src={yes} alt="yes"/> : <img className="learned_icon" src={no} alt="no"/> )}</td>))}
                </tr>
              </tbody>
            </Table>
          </div>
        );
      }
    });
  }

  //making display for an individual BLU and their spell list
  let singleBLUDisplay;
  let singleBLUArray = [singleBLU]
    singleBLUDisplay = singleBLUArray.map((player, index) => {
      if (player.is_active) {
          if(player.has_BLU) {
        const bluNames = Object.keys(player.blu_spells);
        const bluValues = Object.values(player.blu_spells);
        return (
            <div>
            <h1>{player.name}</h1>
          <Table responsive key={index}>
            <thead>
              <tr>
                <th>Spell Name:</th>
                  {bluNames.map(key => (<th>{key.toUpperCase()}</th>))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Learned?</td>
                {bluValues.map(value => (<td>{(value ? <img className="learned_icon" src={yes} alt="yes"/> : <img className="learned_icon" src={no} alt="no"/> )}</td>))}
              </tr>
            </tbody>
          </Table>
          </div>
        );
          } else {
              return (
                <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>WARNING!</Modal.Title>
                </Modal.Header>
              
                <Modal.Body>
                  <p>Selected Player is <i>NOT</i> a Blue Mage.</p>
                </Modal.Body>
              </Modal.Dialog>
              )
          }
      } else if(player.is_active === false) {
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
        <h1>BLU TEST PAGE</h1>
      <ButtonToolbar className="mb-3" aria-label="selecting display elements">
        <ButtonGroup className="me-2" aria-label="player selector">
          <Button variant="info" onClick={getAllBLUs}>
            Get all guild BLUs
          </Button>{" "}
          <Button variant="outline-info" onClick={() => getOneBLU(formName.name)}>
            Get specific BLU
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
        
        <ButtonGroup className="me-2" aria-label="player selector">
        <InputGroup>
          <InputGroup.Text id="btnGroupAddon">Search for a specific spell</InputGroup.Text>
          <FormControl
            type="text"
            placeholder="player name"
            name="name"
            aria-label="player name"
            aria-describedby="btnGroupAddon"
            onChange={handleChange}
          />
        </InputGroup>
        <Button variant="outline-warning" onClick={() => {/*filter blu spell*/}}>
            Search
          </Button>{" "}
        </ButtonGroup>
      </ButtonToolbar>

      {display === true && <div className="all_player">{allPlayerDisplay}</div>}
      {display === false && <div className="single_player">{singleBLUDisplay}</div>}
    </div>
  );
}

export default BLU;
