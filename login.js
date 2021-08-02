//login
const email_input = document.querySelector('email').value; //matches frontend
const pass_input = document.querySelector('password').value; //matches frontend

async function login() {
    if(!email_input || !pass_input) return

    const res = await fetch('/api/login', { //matches api
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email: email_input, //matches api
            password: pass_input //matches api
        })
    })

    if (res.ok) {
        console.log('Success')
        window.location.replace('/') //match url
    } else {
        console.log('Incorrect username/password')
    }
}
