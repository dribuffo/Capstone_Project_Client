//dependencies
import React from "react";
import { Link } from 'react-router-dom';
import "./Home.css";
import ReactPlayer from "react-player"

//images
import guildCrest from '../images/crest.png'
let freeTrial = "https://freetrial.finalfantasyxiv.com/"
let logo = "https://static.wikia.nocookie.net/finalfantasy/images/b/b3/FFXIV_logo.png"
let ewLogo = "https://img.finalfantasyxiv.com/lds/promo/h/A/eqkthVf5uqxgBzUv66zhucFFh4.png";

//video
let long = "https://www.youtube.com/watch?v=T6tEi-6BLsw";
let endwalker = "https://www.youtube.com/watch?v=zTTtd6bnhFs";

function Home() {
    return(
        <div className="homepage">
        <img className="crest" src={guildCrest} alt="guild crest"/>
        <h1 className="welcome">Welcome to the collectables database for the Lex Talionis(Balmung) FFXIV guild</h1>
        <a href={freeTrial}> <img className="logo" src={logo} alt="final fantasy xiv logo"/> </a>
        <h3 className="trialText">Click the above image to learn about the free trial!</h3>
        <h3 className="trailersText"> Or click below if you're interested in watching some videos for award-winning and critically acclaimed MMORPG Final Fantasy XIV that has a free trial up to level 60 and includes the first expansion 'Heavensward'.</h3>
        <section className="trailers">
          <a href={endwalker} id="arr"> <img className="trailerLogo" src={ewLogo} alt="final fantasy xiv logo"/> </a>
        </section>
        <section className="trailerVid">
          <ReactPlayer className="video" id="hw" url="https://www.youtube.com/watch?v=T6tEi-6BLsw" controls="true"/>
          <ReactPlayer className="video" id="arr" url="https://www.youtube.com/watch?v=zTTtd6bnhFs" controls="true"/>
        </section>
        </div>
    )
}

export default Home;