const _id = document.getElementById('') //fill in elements
const user_id = document.getElementById('')
const track_id = document.getElementById('')
const track_name = document.getElementById('')
const genre = document.getElementById('')

//add to like playlist
async function addLiked() {
    const like_data = {
        _id: _id.value,
        user_id: user_id.value,
        track_id: track_id.value,
        track_name: track_name.value,
        genre: genre.value
    }

    const res = await fetch('/api/like', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(like_data)
    })
    
    if(!res.ok) {
        console.log('Error') 
    } 
}

//add to dislike playlist
async function addDislike() {
    const dislike_data = {
        _id: _id.value,
        user_id: user_id.value,
        track_id: track_id.value,
        track_name: track_name.value,
    }

    const res = await fetch('/api/dislike', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(dislike_data)
    })

    if(!res.ok) {
        console.log('Error') 
    } 
}

//remove from like playlist
async function delLike(like_data) {

    const conf = confirm('Do you want to remove this song from your liked playlist?')
    if (conf) {

        const res = await fetch('/api/like', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(like_data)
        })

        if (res.ok) {
            window.location.reload()
        } else {
            console.log('Error')
        }
    }
}

//remove from dislike playlist
async function delDislike(dislike_data) {

    const conf = confirm('Are you sure you want to remove this song?')
    if (conf) {
        const res = await fetch('/api/dislike', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dislike_data)
        })

        if (res.ok) {
            window.location.reload()
        } else {
            console.log('Error')
        }
    }
}

//display like playlist 
async function showLike() {

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

//display dislike playlist 
async function showDislike() {

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