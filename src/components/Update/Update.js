//dependencies
import React, { useState } from "react";
import "./Update.css";
import apiUrl from "../../apiUrl";
import axios from "axios";

//react bootstrap imports
import {
  ButtonToolbar,
  Button,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Table,
} from "react-bootstrap";

//image imports to use instead of true and false
import yes from "../images/Check.png"
import no from "../images/Close.png"


function Update() {
//USE STATES
  //data for the updates
  const [data, setData] = useState({});
  //form
  const [formName, setFormName] = useState("");
  //player
  const [singlePlayer, setSinglePlayer] = useState([]);
  //display
  const [info, setInfo] = useState("");
  //active status
  const [active, setActive] = useState({is_active: Boolean});
  //blu status
  const [bluStatus, setBluStatus] = useState({has_BLU: Boolean});
  //the check boxes
  const [checked, setChecked] = useState(false);

//HANDLER FUNCTIONS
  //handle functions for checkbox
  const handleChecked = () => {
    setChecked(!checked);
  };
  //handle function for search form
  const handleChange = ({ currentTarget: input }) => {
    setFormName({ ...formName, [input.name]: input.value });
  };
  //handle function for active status radio button
  const handleRadioChange = (e) => {
      setActive({is_active: e.target.value});
  }

  const handleRadioTwoChange = (e) => {
    setBluStatus({has_BLU: e.target.value});
  }

//API CALLS
  //API call to get information
  function getPlayer(formName) {
    axios
      .get(`${apiUrl}` + "/player/find/" + formName)
      .then((data) => setSinglePlayer(data.data.Character))
      .catch((error) => console.log(error));
  }

//UPDATE -- API CALLS
  //Update name, active status, BLU status
  //active status
  function updateStatus(formName) {
    fetch("http://localhost:4000/player/update/" + formName, { 
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(active)
    })
      .catch((error) => console.log(error));
  }
  //BLU status
  function updateBLU(formName) {
    fetch("http://localhost:4000/player/update/" + formName, { 
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bluStatus)
    })
      .catch((error) => console.log(error));
  }
  //update pony
  //update bird
  function updateBird() {
    fetch(`${apiUrl}` + "/player/update/" + formName + "/bird/" + "test", { //replace test with state value
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: " " //placeholder for the actual code
    })
      .catch((error) => console.log(error));
  }
  //update BLU spells


  //MAPPING FUNCTION
  // mega mapping function that maps all data for the character:
  let singlePlayerDisplay;
  let singlePlayerArray = [singlePlayer]
    singlePlayerDisplay = singlePlayerArray.map((player, index) => {
        if(singlePlayer != false) {
        const ponyNames = Object.keys(player.pony);
        const ponyValues = Object.values(player.pony);
        const birdNames = Object.keys(player.bird);
        const birdValues = Object.values(player.bird);
        const spellNames = Object.keys(player.blu_spells);
        const spellValues = Object.values(player.blu_spells);

        return (
        <div key={index}>
          {/* display table for status */}
            <div style={{display: info=== "status" || info==="all" ? "inline" : "none"}}>
          <Table responsive>
            <thead>
              <tr>
                <th>Are they active?</th>
                <th>Are they a BLU?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {(<td>{(player.is_active ? <img className="icon" src={yes} alt="yes"/> : <img className="icon" src={no} alt="no"/> )}</td>)}
                {(<td>{(player.has_BLU ? <img className="icon" src={yes} alt="yes"/> : <img className="icon" src={no} alt="no"/> )}</td>)}
              </tr>
            </tbody>
          </Table>
            </div>
          {/* display table for pony */}
            <div style={{display: info=== "pony" || info==="all" ? "inline" : "none"}}>
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
            <div style={{display: info=== "bird" || info==="all" ? "inline" : "none"}}>
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
          {/*display for Blue Magic */}
            <div style={{display: info=== "blu" || info==="all" ? "inline" : "none"}}>
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
        </div>
        );
      }
    });

return (
    <div>
      <h1>Update</h1>
      <div className="div_for_toolbar">
      <h2 className="toolbar_header">Step 1: Please search for character information:</h2>
        <ButtonToolbar>
          <InputGroup>
            <InputGroup.Text id="btnGroupAddon">
              Update Which Character?
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
          <Button variant="info" onClick={() => getPlayer(formName.name)}>
            Submit
          </Button>{" "}
        </ButtonToolbar>
      </div>
      <div className="div_for_dropdown">
      <h2 className="data_display_dropdown">Step 2: Please choose what data to update:</h2>
        <DropdownButton
          as={ButtonGroup}
          title="Data to be displayed"
          id="bg-nested-dropdown"
          variant="secondary"
        >
          <Dropdown.Item eventKey="all" onClick={() => setInfo("all")}>All</Dropdown.Item>
          <Dropdown.Item eventKey="status" onClick={() => setInfo("status")}>Status</Dropdown.Item>
          <Dropdown.Item eventKey="pony" onClick={() => setInfo("pony")}>Pony</Dropdown.Item>
          <Dropdown.Item eventKey="bird" onClick={() => setInfo("bird")}>Bird</Dropdown.Item>
          <Dropdown.Item eventKey="blu" onClick={() => setInfo("blu")}>Blue Magic</Dropdown.Item>
        </DropdownButton>
        <ButtonGroup className="me-2" aria-label="player selector"></ButtonGroup>
      </div>

      {/* displays the players information */}
      <div className="single_player">
          <h2>Player Info: {singlePlayer.name}</h2>
          {singlePlayerDisplay}
      </div>

    {/* update bars */}
    <div className="div_for_updaters">
        <h2>Step 3: Update information below:</h2>
      {/* updates Character status */}      
      <div className="div_for_status">
        <div>
      <h3 className="demo_heading">Player's Status Updates:</h3>
      {/* Are they active or inactive? */}
      <h4>Are they Active?</h4>
      <input type="radio" value="true" id="true" onChange={handleRadioChange} name="active_status"/>
        <label for="true">Active</label>
      <input type="radio" value="false" id="false" onChange={handleRadioChange} name="active_status"/>
        <label for="false">Inactive</label>
        <Button variant="info" onClick={() => updateStatus(formName.name)}>
            Submit
          </Button>{" "}
        </div>
        {/* Did they become a Blue Mage? */}
        <h4>Are they a Blue Mage?</h4>
        <input type="radio" value="true" id="true" onChange={handleRadioTwoChange} name="blu_status"/>
        <label for="true">Yes</label>
      <input type="radio" value="false" id="false" onChange={handleRadioTwoChange} name="blu_status"/>
        <label for="false">No</label>
        <Button variant="info" onClick={() => updateBLU(formName.name)}>
            Submit
          </Button>{" "}
      </div>

      {/* displays all the pony related check boxes */}
      <div className="pony_choice">
      <h3 className="pony_heading">What Ponys does the player have?</h3>
        <Checkbox label="Aithon" value={checked} onChange={handleChecked} />
        <Checkbox label="Boreas" value={checked} onChange={handleChecked} />
        <Checkbox label="Enbarr" value={checked} onChange={handleChecked} />
        <Checkbox label="Gullfaxi" value={checked} onChange={handleChecked} />
        <Checkbox label="Markab" value={checked} onChange={handleChecked} />
        <Checkbox label="Xanthos" value={checked} onChange={handleChecked} />
        <Checkbox label="Nightmare" value={checked} onChange={handleChecked} />
        <Checkbox label="Kirin" value={checked} onChange={handleChecked} />
      </div>
      
      {/* displays all the pony related check boxes */}      
      <div className="bird_choice">
      <h3 className="bird_heading">What Birds does the player have?</h3>
        <Checkbox label="Rose Lanner" value={checked} onChange={handleChecked} />
        <Checkbox label="White Lanner" value={checked} onChange={handleChecked} />
        <Checkbox label="Dark Lanner" value={checked} onChange={handleChecked} />
        <Checkbox label="Round Lanner" value={checked} onChange={handleChecked} />
        <Checkbox label="Warring Lanner" value={checked} onChange={handleChecked} />
        <Checkbox label="Sophic Lanner" value={checked} onChange={handleChecked} />
        <Checkbox label="Demonic Lanner" value={checked} onChange={handleChecked} />
        <Checkbox label="Firebird" value={checked} onChange={handleChecked} />
      </div>
    </div>

    <div className="blu_choice">
        <h3 className="blu_heading">What spells do they know?</h3>
        <InputGroup>
            <InputGroup.Text id="btnGroupAddon">
              Newly learned spell
            </InputGroup.Text>
            <FormControl
              type="text"
              placeholder="spell name"
              name="name"
              aria-label="player name"
              aria-describedby="btnGroupAddon"
              onChange={handleChange}
            />
          </InputGroup>
    </div>



    </div>
  );
  }
export default Update;


//checkbox component
const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
}