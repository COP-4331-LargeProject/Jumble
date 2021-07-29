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
        <Link to="/" style={{ textDecoration: 'none' }}><p id="logoutButton">Logout</p></Link>
        <SongList/>
    </div>  
    );
}

export default DislikedSongs;