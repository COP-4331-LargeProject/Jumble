import React from "react";
import "../Stylesheet.css";
import DashboardBackground from "../components/DashboardBackground";
import { Link } from "react-router-dom";

function DislikedSongs() {
    return(
    <div id="dislikedSongsDiv">
        <DashboardBackground/>
        <Link to="/" style={{ textDecoration: 'none' }}><p id="logoutButton">Logout</p></Link>
        <span>To be done</span>
    </div>  
    );
}

export default DislikedSongs;