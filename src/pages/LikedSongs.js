// Displays the liked songs page. Add the <Songlist/> component like on the Disliked songs page to see data pop up.

import React from "react";
import DashboardBackground from "../components/DashboardBackground";
import "../Stylesheet.css";
import { Link } from "react-router-dom";

function LikedSongs() {
    return(
    <div id="likedSongsDiv">
        <DashboardBackground/>
        <Link to="/" style={{ textDecoration: 'none' }}><p id="logoutButton">Logout</p></Link>
        <span>To be done</span>
    </div>  
    );
}

export default LikedSongs;