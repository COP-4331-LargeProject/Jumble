//genre
async function genre() {
    
    const artist_input = document.querySelector('search_artist').value //match frontend
    const track_input = document.querySelector('search_track').value //match frontend
    const genre_name = document.getElementsByName('Categories').value //match frontend
    const genre_id = document.getElementById('Categories').value //match frontend
    
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
}

//play song 
async function getTrack() {

    const genre_id = document.getElementById('Categories').value //match frontend

    const res = await fetch('/spotify/recommendation/'+user_id+'/'+genre_id, { //pull genre
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => res.json()) 
    .catch(error => console.log(error))
}
