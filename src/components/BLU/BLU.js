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
} from "react-bootstrap";

function BLU() {
  const [allBLUs, setAllBLUs] = useState([]);
  const [singleBLU, setSingleBLU] = useState({});

  //form input state and handler
  const [formName, setFormName] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setFormName({ ...formName, [input.value]: input.name });
  };

  //call to the API to get all Players
  function getAllBLUs() {
    axios
      .get(`${apiUrl}` + "/player/find")
      .then((data) => setAllBLUs(data.data.Characters))
      .catch((error) => console.log(error));
  }

  //call to the API to get a single player
  function getOneBLU(formName) {
    axios
      .get(`${apiUrl}` + "/player/find/" + formName)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
  console.log("formname is:", formName);

  //map through the player list to display character + mounts for all characters
  let allPlayerDisplay;
  if (allBLUs.length > 0) {
    allPlayerDisplay = allBLUs.map((player, index) => {
      if (player.has_BLU) {
        const spellNames = Object.keys(player.blu_spells);
        const spellValues = Object.values(player.blu_spells);

        // if (Object.values(player.blu_spells)) {
        //     return <img src={yes} alt="yes"/>
        // } else {
        //     return <img src={no} alt="no"/>
        // }
        
        return (
          <div>
            <h1>{player.name}</h1>
            <Table responsive key={index}>
              <thead>
                <tr>
                  <th>Spell Name:</th>
                  {spellNames.map((key) => (
                    <th>{key.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Learned?</td>
                  {spellValues.map((value) => (
                    <td>{(value ? <img className="learned_icon" src={yes} alt="yes"/> : <img className="learned_icon" src={no} alt="no"/> )}</td>
                  ))}
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
  //     singlePlayerDisplay = singlePlayer.map((player, index) => {
  //       if (player.is_active) {
  //         const spellNames = Object.keys(player.pony);
  //         const spellValues = Object.values(player.pony);
  //         return (
  //             <div>
  //             <h1>{player.name}</h1>
  //           <Table responsive key={index}>
  //             <thead>
  //               <tr>
  //                 <th>Ponies</th>
  //                   {spellNames.map(key => (<th>{key.toUpperCase()}</th>))}
  //               </tr>
  //             </thead>
  //             <tbody>
  //               <tr>
  //                 <td>ARR</td>
  //                 {spellValues.map(value => (<td>{value.toString()}</td>))}
  //               </tr>
  //             </tbody>
  //           </Table>
  //           </div>
  //         );
  //       } else {
  //           return "player is not active."
  //       }
  //     });

  return (
    <div>
      <ButtonToolbar className="mb-3" aria-label="selecting display elements">
        <ButtonGroup className="me-2" aria-label="player selector">
          <Button variant="info" onClick={getAllBLUs}>
            Get all guild BLUs
          </Button>{" "}
          <Button variant="outline-info" onClick={getOneBLU}>
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
      </ButtonToolbar>

      <div className="all_player">{allPlayerDisplay}</div>
      <div className="single_player">{singlePlayerDisplay}</div>
    </div>
  );
}

export default BLU;
