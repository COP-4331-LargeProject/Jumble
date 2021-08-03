//This Page Renders the Disliked Songs Page
import React from "react";
import "../Stylesheet.css";
import DashboardBackground from "../components/DashboardBackground";
import { Link } from "react-router-dom";
import SongList from "../components/SongList";
import SingleSong from "../components/SingleSong";


function DislikedSongs() {
    return(
    <div id="dislikedSongsDiv">
        <DashboardBackground/>
        <div style={{display: "flex", flexDirection: "row"}}><Link id="homeStyle" to="/Dashboard"><img id="homeImage" src= {require('../Assets/Images/Home.PNG').default} alt="cannot display"/></Link><Link to="/" style={{ textDecoration: 'none' }}><p id="logoutButton">Logout</p></Link></div>
        <div className="dislikedDiv">
            <div id="dislikedScrollDiv">
                <SongList/>
            </div>
        </div>
    </div>  
    );
}

export default DislikedSongs;