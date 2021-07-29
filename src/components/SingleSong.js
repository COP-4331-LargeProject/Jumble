// Sample song for formatting on the Liked/Disliked Songs Page. Component can be deleted once api calls are added.
import React from "react";
import "../Stylesheet.css";
import { Link } from "react-router-dom";

const SingleSong = () => {
    return (
        <div id="singleSong">
        <span className="songBox">
            <span>
                *Play*
            </span>
            <div>
                Artist
            </div>
            <div>
                Song Name
            </div>
            <span>Time</span>
        </span>
    </div>
  );
};

export default SingleSong;