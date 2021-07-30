//recover password
const email_input = document.querySelector('email').value; //match frontend

async function recover() {
    console.log('reset password')
    if (!email_input) return

    fetch('/api/forgotPassword', { //match api
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email_input,
        })
    })

    if (res.ok) {
        console.log('Success')
        window.location.replace('/login') //match url
    } else {
        console.log('Error')
    }

}
