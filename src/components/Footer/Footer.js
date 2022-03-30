//dependencies
import React from "react";
import "./Footer.css";
import guildCrest from '../images/crest.png'

//links
let guildSite = 'https://na.finalfantasyxiv.com/lodestone/freecompany/9236179148295113228/';

function Footer() {
    return(
        <footer>
            <a href={guildSite}><img className="iFoot" src={guildCrest} alt="guild crest" /></a>
            <p>Created by: Zebix Rune (Balmung)</p>
        </footer>
    )
}

export default Footer;