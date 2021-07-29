// Dashboard page. It's called Genre but should really should be called dashboard but it would take a bit to change.
// Displays the center page for the app after user has logged in with the playlists and Genres. 
import React from "react";
import DashboardBackground from "../components/DashboardBackground";
import { Link } from "react-router-dom";
import ListCatagories from "../components/ListCatagories";
import ListPlaylists from "../components/ListPlaylists";
function Genre() {

  return (
    <div>
      <DashboardBackground/>
      <Link to="/" style={{ textDecoration: 'none' }}><p id="logoutButton">Logout</p></Link>
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
