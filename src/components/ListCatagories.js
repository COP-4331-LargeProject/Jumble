// Component which list the Genres that we have for to the User to choose from.
import React from "react";
import "../Stylesheet.css";
import { Link } from "react-router-dom";
import HorizontalScroll from 'react-scroll-horizontal';
import Cookies from 'js-cookie'

var userid = Cookies.get('user_id');

const ListCatagories = () => {
  const Categories = ['Anime', 'Disco', 'Metal', 'Rainy Day', 'K-Pop', 'Hip-Hop', 'Pop', 'Rock', 'Rap', 'Country']
  const genre = async (event) =>  {
    event.preventDefault();
    const artist_input = "bts" //match frontend
    const track_input = "permission to dance" //match frontend
    const genre_name = "K-pop" //match frontend
    const genre_id = "k-pop" //match frontend
    
    const sample_artists = await fetch('/spotify/search/artist/'+artist_input, { //match api
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }) 
    .then(res => res.json()) 
    .catch(error => console.log(error))

    const sample_tracks = await fetch('/spotify/search/track/'+track_input, { //match api
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }) 
    .then(res => res.json()) 
    .catch(error => console.log(error))

    
    const genre_data = {
        genre_id: genre_id,
        genre_name: genre_name,
        sample_artists: sample_artists.value,
        sample_tracks: sample_tracks.value
    }

    const res = await fetch('/api/genre', { //res?
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(genre_data)
    }) 
    getTrack();
    window.location.replace('http://jumble.site:5000/#/Track') 
}

const getTrack = async (event) =>  {
  event.preventDefault();
  const genre_id = "k-pop" //match frontend

  const res = await fetch('/spotify/recommendation/'+userid+'/'+genre_id, { //pull genre
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
  })


  .then(res => res.json()) 
  .catch(error => console.log(error))
}
    
    const child   = { width: `30em`, height: `50px`}
    const parent  = { width: `45em`, height: `100px`}
    return (
      <div id="genres">
      <div style={parent}>
        <HorizontalScroll>
          <img className="listItems" id="anime" onClick={genre} src= {require('../Assets/Images/anime.png').default} alt="cannot display"/>
          <img className="listItems" id="Metal" onClick={genre} src= {require('../Assets/Images/metal.png').default} alt="cannot display"/>
          <img className="listItems" id="K-pop" onClick={genre} src= {require('../Assets/Images/kpop.png').default} alt="cannot display"/>
          <img className="listItems" id="R&B" onClick={genre} src= {require('../Assets/Images/rnb.png').default} alt="cannot display"/>
          <img className="listItems" id="Hip-Hop" onClick={genre} src= {require('../Assets/Images/hiphop.png').default} alt="cannot display"/>
          <img className="listItems" id="Rock" onClick={genre} src= {require('../Assets/Images/rock.png').default} alt="cannot display"/>
          <img className="listItems" id="Study" onClick={genre} src= {require('../Assets/Images/study.png').default} alt="cannot display"/>
          <img className="listItems" id="Country" onClick={genre} src= {require('../Assets/Images/country.png').default} alt="cannot display"/>
          <img className="listItems" id="Indie" onClick={genre} src= {require('../Assets/Images/indie.png').default} alt="cannot display"/>
          <img className="listItems" id="Latin" onClick={genre} src= {require('../Assets/Images/latin.png').default} alt="cannot display"/>
        </HorizontalScroll>
      </div>
      </div>
    );
};

export default ListCatagories;