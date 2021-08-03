// Sample song for formatting on the Liked/Disliked Songs Page. Component can be deleted once api calls are added.
import React from "react";
import "../Stylesheet.css";
import { Link } from "react-router-dom";

const SingleSong = () => {
    return (
        <div id="singleSong">
        <span className="songBox">
            
            <img className="playlistImg" src= {require('../Assets/Images/playGray.png').default} alt="cannot display"/>
            
                Artist
          
                Song Name
            
            <span>Time</span>
        </span>
    </div>
  );
};

export default SingleSong;