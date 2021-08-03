//spotify account authentication
async function authentication() {

    await fetch('/spotify', { 
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json' 
        },
    })

    .then(res => res.json()) 
    .then(json => console.log(json))
    .catch(error => console.log(error))
} 
