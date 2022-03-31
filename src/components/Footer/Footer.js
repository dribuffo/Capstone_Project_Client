//dependencies
import React from "react";
import "./Footer.css";
import guildCrest from '../images/crest.png'
import github from "../images/github.png"
import linkedin from "../images/linkedin.png"

//links
let guildSite = 'https://na.finalfantasyxiv.com/lodestone/freecompany/9236179148295113228/';
let githubLink = 'https://github.com/dribuffo'
let linkedinLink = 'https://www.linkedin.com/in/danielribuffo/'

function Footer() {
    return(
        <footer>
            <a href={guildSite}><img className="iFoot" src={guildCrest} alt="guild crest" /></a>
            <p>Created by: Zebix Rune (Balmung)</p>
            {/* Github icons created by Pixel perfect - Flaticon */}
            <a href={githubLink}><img className="iFoot" src={github} alt="Github icons created by Pixel perfect - Flaticon" /></a>
            {/* Linkedin icons created by riajulislam - Flaticon */}
            <a href= {linkedinLink}><img className="iFoot" src={linkedin} alt="Linkedin icons created by riajulislam - Flaticon" /></a>
        </footer>
    )
}

export default Footer;