import React from "react";
import "../Stylesheet.css";
import Button from '@material-ui/core/Button';
import DashboardBackground from "../components/DashboardBackground";
import { Link } from "react-router-dom";

function Track() {
    return(
        <div>
        <DashboardBackground/>
        <Link to="/" style={{ textDecoration: 'none' }}><p id="logoutButton">Logout</p></Link>
    <div id="trackDiv">
        <div id="trackPicture">
            <img className="trackImage" src= {require('../Assets/Images/FlowerBoy.jpg').default} alt="cannot display"/>
            <br/>
        </div>
        <div id="trackGenre">
            <span>User's Name.</span><br/>
            <span>You're listening</span><br/>
            <span>to hip-hop.</span>
        </div>
        <div id="trackInfo">
            <span>Track Name</span><br/>
            <span>Artist</span><br/>
            <span>Album</span><br/>
            <span>
                <Button variant='contained' color='secondary'>X</Button>
                <Button variant='contained' color ='primary'>/</Button>
            </span>
        </div>
    </div>  
    </div>
    );
}

export default Track;