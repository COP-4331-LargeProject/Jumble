// Dashboard page. It's called Genre but should really should be called dashboard but it would take a bit to change.
// Displays the center page for the app after user has logged in with the playlists and Genres. 
import React from "react";
import DashboardBackground from "../components/DashboardBackground";
import { Link } from "react-router-dom";
import ListCatagories from "../components/ListCatagories";
import ListPlaylists from "../components/ListPlaylists";
import { Button } from "@material-ui/core";
function Genre() {
//spotify account authentication
/*const authentication = async (event) => {
  //event.preventDefault();
    await fetch('/api/spotify', { 
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
    })

}; */

  const authentication = async (event) => {
    console.log('redirecting to spotify login')
    window.location.replace('/api/spotify') //match url
  }


  return (
    <div>
      <DashboardBackground/>
      <div style={{display: "flex", flexDirection: "row"}}><Link id="homeStyle" to="/Dashboard"><img id="homeImage" src= {require('../Assets/Images/Home.PNG').default} alt="cannot display"/></Link><Link to="/" style={{ textDecoration: 'none' }}><p id="logoutButton">Logout</p></Link></div>
      <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: '23%'}} >      
        <Button variant="contained" color="primary" onClick={authentication}>
          Connect to Spotify
        </Button>
      </div>

      <div id="dashboardLayout">
        <img className="imageBanner" src= {require('../Assets/Images/Dashboard_Banner.png').default} alt="cannot display"/><br/>
        <span id="exploreCat">Expore Categories</span>
        <ListCatagories/><br/>
        <span id="playlistHeader">Playlists</span>
        <ListPlaylists/>
      </div>
    </div>
  );
}
export default Genre;
