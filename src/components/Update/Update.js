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
  Form,
} from "react-bootstrap";

//image imports to use instead of true and false
import yes from "../images/Check.png"
import no from "../images/Close.png"


function Update() {
//USE STATES
  //for the spell updates
  const [spell, setSpell] = useState({
      name: "",
      check: true
  });
  //for the pony updates
  const [pony, setPony] = useState({
    name: "",
    check: true
  });
  //for the bird updates
  const [bird, setBird] = useState({
        name: "",
        check: true
  });
  // name form
  const [formName, setFormName] = useState("");
  //player update
  const [singlePlayer, setSinglePlayer] = useState({
      name: "",
      pony: {},
      bird: {},
      blu_spells: {}
  });
  //table display
  const [info, setInfo] = useState("");
  //form change for status update
  const [formChange, setFormChange] = useState({
        is_active: "false",
        has_BLU: "false",
        pony: {
            aithon: false,
            boreas: false,
            enbarr: false,
            gullfaxi: false,
            markab: false,
            xanthos: false,
            nightmare: false,
            kirin: false,
        },
  })

//HANDLER FUNCTIONS
  //handle function for search form
  const handleChange = ({ currentTarget: input }) => {
    setFormName({ ...formName, [input.name]: input.value });
  };

  //handle function for spell form
  const handleBluChange = ({ currentTarget: input }) => {
    setSpell({ ...spell, [input.name]: input.value });
  };

  //handle function for pony form
  const handlePonyChange = ({ currentTarget: input }) => {
    setPony({ ...pony, [input.name]: input.value });
  };

  //handle function for bird form
  const handleBirdChange = ({ currentTarget: input }) => {
    setBird({ ...bird, [input.name]: input.value });
  };

  // handle function for update status radio buttons
  function handleFormChange(event) {
      event.preventDefault()
    const {name, value, type, checked} = event.target
    setFormChange(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })
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
  //Update active status, BLU status
  //active status
  function updateForm(formChange){
    fetch(apiUrl + "/player/update/" + formName.name, { 
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formChange)
    })
        .catch((error) => console.log(error));
  }
  //update BLU spells
  function learnSpell(spell) {
      let azure = {}
      azure[spell.name] = spell.check
    fetch(apiUrl + "/player/update/" + formName.name + "/BLU/" + spell.name, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(azure)
    })
    }

//update pony list when pony is acquired
  function acquirePony(pony) {
    let stable = {}
    stable[pony.name] = pony.check
  fetch(apiUrl + "/player/update/" + formName.name + "/pony/" + pony.name, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stable)
  })
  }

  //update bird list when bird is acquired
  function acquireBird(bird) {
    let aviary = {}
    aviary[bird.name] = bird.check
  fetch(apiUrl + "/player/update/" + formName.name + "/bird/" + bird.name, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aviary)
  })
  }


  //MAPPING FUNCTION
  // mega mapping function that maps all data for the character:
  let singlePlayerDisplay;
  let singlePlayerArray = [singlePlayer]
    singlePlayerDisplay = singlePlayerArray.map((player, index) => {
        if(player != null) {
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

// MAIN RETURN
return (
    <div className="update_page">
      <h1>Welcome to the Update Page!</h1>
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
          <Button variant="info" type="button" onClick={() => getPlayer(formName.name)}>
            Find that player!
          </Button>{" "}
        </ButtonToolbar>
        <Form.Text id="passwordHelpBlock" muted>
                Warning: Player names are case sensitive with _ used instead of spaces.
        </Form.Text>
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
    <form onSubmit={() => updateForm(formChange)}>
    <div className="div_for_updaters">
        <h2>Step 3: Update information below:</h2>
      {/* updates Character status */}      
      <div className="div_for_status">
        <div>
      <h3 className="demo_heading">Player's Status Updates:</h3>
      {/* Are they active or inactive? */}
      <h4>Are they Active?</h4>
      <input type="radio" value="true" id="active" onChange={handleFormChange} name="is_active" checked={formChange.is_active === "true"}/>
        <label for="true">Active</label>
      <input type="radio" value="false" id="inactive" onChange={handleFormChange} name="is_active" checked={formChange.is_active === "false"}/>
        <label for="false">Inactive</label>
        </div>
        {/* Did they become a Blue Mage? */}
        <h4>Are they a Blue Mage?</h4>
        <input type="radio" value="true" id="yes" onChange={handleFormChange} name="has_BLU"/>
        <label for="true">Yes</label>
      <input type="radio" value="false" id="no" onChange={handleFormChange} name="has_BLU"/>
        <label for="false">No</label>
      </div>

      {/* POST MVP: displays all the pony related check boxes */}
      {/* <div className="pony_choice">
      {/* <h3 className="pony_heading">What Ponys does the player have?</h3> 
            <label>
            <input type="checkbox" id="pony.aithon" name="pony.aithon" checked={formChange.pony.aithon.value} onChange={handleFormChange} />
            Aithon
            </label>
            <label>
            <input type="checkbox" id="boreas" name="boreas" checked={formChange.pony.boreas.value} onChange={handleFormChange} />
            Boreas
            </label>
            <label>
            <input type="checkbox" id="enbarr" name="enbarr" checked={formChange.pony.enbarr.value} onChange={handleFormChange} />
            Enbarr
            </label>
            {/* <label>
            <input type="checkbox" name="gullfaxi" checked={formChange.pony.gullfaxi} onChange={handleFormChange} />
            Gullfaxi
            </label>
            <label>
            <input type="checkbox" name="markab" checked={formChange.pony.markab} onChange={handleFormChange} />
            Markab
            </label>
            <label>
            <input type="checkbox" name="xanthos" checked={formChange.pony.xanthos} onChange={handleFormChange} />
            Xanthos
            </label>
            <label>
            <input type="checkbox" name="nightmare" checked={formChange.pony.nightmare} onChange={handleFormChange} />
            Nightmare
            </label>
            <label>
            <input type="checkbox" name="kirin" checked={formChange.pony.kirin} onChange={handleFormChange} />
            Kirin
            </label> 
        </div> */} 
    </div>
    <Button variant="info" type="submit" > 
            Submit all changes
        </Button>{" "}
    </form>
    <div className="pony_choice">
        <h3 className="pony_heading">What pony did you acquire?</h3>
        <Form.Label>Pony won:</Form.Label>
            <FormControl
              type="text"
              placeholder="pony name"
              name="name"
              aria-label="player name"
              aria-describedby="btnGroupAddon"
              onChange={handlePonyChange}
            />
            <Button variant="info" onClick={() => acquirePony(pony)} > 
            Stable that pony!
            </Button>{" "}
            <Form.Text id="passwordHelpBlock" muted>
                Warning: Pony names must be entered in all lowercase.
            </Form.Text>
    </div>
    <div className="bird_choice">
        <h3 className="bird_heading">What bird did you acquire?</h3>
        <Form.Label>bird won:</Form.Label>
            <FormControl
              type="text"
              placeholder="bird name"
              name="name"
              aria-label="player name"
              aria-describedby="btnGroupAddon"
              onChange={handleBirdChange}
            />
            <Button variant="info" onClick={() => acquireBird(bird)} > 
            Roost that bird!
            </Button>{" "}
            <Form.Text id="passwordHelpBlock" muted>
                Warning: Bird names must be entered in all lowercase, with _ used instead of spaces.
            </Form.Text>
    </div>
    <div className="blu_choice">
        <h3 className="blu_heading">What spell did the player learn?</h3>
        <Form.Label>Newly Learned Spell:</Form.Label>
            <FormControl
              type="text"
              placeholder="spell name"
              name="name"
              aria-label="player name"
              aria-describedby="btnGroupAddon"
              onChange={handleBluChange}
            />
            <Button variant="info" onClick={() => learnSpell(spell)} > 
            Learn that spell!
            </Button>{" "}
            <Form.Text id="passwordHelpBlock" muted>
                Warning: Spell names must be entered in all lowercase, with _ used instead of spaces.
            </Form.Text>
    </div>
    
    {/* MAIN DIV CLOSING TAG */}
    </div>
  );
  }
export default Update;