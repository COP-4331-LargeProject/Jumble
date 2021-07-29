//This component renders the list of Liked/Unliked songs. The Songs array can be replaced with data passed back from
// The api
import React from "react";
import "../Stylesheet.css";
import { Link } from "react-router-dom";
import SingleSong from "./SingleSong";

const SongList = () => {
    // Replace with array of songs passed from the backend
    const Songs = [<SingleSong/>,<SingleSong/>,<SingleSong/>]
  return ( 
    <div id="songListdiv">
        {
            Songs.map(Songs => <div>{Songs}</div>)
        }
    </div>
  );
};

export default SongList;