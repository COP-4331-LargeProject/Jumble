// Track page which will be the page the user is directed to after chosing a Genre. They will be able to like and dislike
// music on this page

import React from "react";
import "../Stylesheet.css";
import Button from '@material-ui/core/Button';
import DashboardBackground from "../components/DashboardBackground";
import { Link } from "react-router-dom";

function Track() {
    return(
        <div>
        <DashboardBackground/>
        <div style={{display: "flex", flexDirection: "row"}}><Link id="homeStyle" to="/Dashboard"><img id="homeImage" src= {require('../Assets/Images/Home.PNG').default} alt="cannot display"/></Link><Link to="/" style={{ textDecoration: 'none' }}><p id="logoutButton">Logout</p></Link></div>
    <div id="trackDiv">
        <br/>
        <div id="player">
            <h4 id="trackInfo">You're listening <br/> to K-pop</h4>
            <br/>
            <iframe id="playerContainer" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8NzI27ip7J0" width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <span style={{marginLeft:"5%"}}>
                <Button variant='contained' color='secondary'>Dislike</Button>
                <Button variant='contained' color ='primary'>Like</Button>
            </span>
        </div> 
    </div>  
    </div>
    );
}

export default Track;