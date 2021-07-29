// Component display's the playlist (Liked, Disliked) for the user on the Dashboard page

import React from "react";
import "../Stylesheet.css";
import { Link } from "react-router-dom";

const ListPlaylists = () => {
    //const Playlists = ['../Assets/Images/Liked_Icon.png', '../Assets/Images/Disliked_Icon.png',]
  return ( 
    <div id="playlistDiv">
        <Link className="playlistImages" to="/LikedSongs"><img src= {require('../Assets/Images/Liked_Icon.png').default} alt="cannot display"/></Link>
        <Link className="playlistImages" to="/DislikedSongs"><img  src= {require('../Assets/Images/Disliked_Icon.png').default} alt="cannot display"/></Link>
    </div>
  );
};

export default ListPlaylists;