//This component renders the list of Liked/Unliked songs. The Songs array can be replaced with data passed back from
// The api
import React from "react";
import "../Stylesheet.css";
import { Link } from "react-router-dom";
import SingleSong from "./SingleSong";

const LikedSongList = () => {
    // Replace with array of songs passed from the backend

    const showLike = async (event) => {

        const res = await fetch('/api/liked_tracks', { //do i need res?
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
        })
    
        .then(res => res.json()) 
        .catch(error => console.log(error))
    } 

    const Songs = [showLike]
  return ( 
    <div id="songListdiv">
        {
            Songs.map(Songs => <div>{Songs}</div>)
        }
    </div>
  );
};
export default LikedSongList;