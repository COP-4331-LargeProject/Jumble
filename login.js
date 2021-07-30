//login
const email_input = document.querySelector('email').value; //match frontend
const pass_input = document.querySelector('password').value; //match frontend

async function login() {
    if(!email_input || !pass_input) return

    const res = fetch('/api/login', { //match api
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: email_input, //match api
            password: pass_input //match api
        })
    })

    if (!res.ok) {
        console.log('Incorrect username/password')
    } else {
        console.log('Success')
        window.location.replace('/') //match url
    }
}
