//login
document.querySelector('#login-btn').addEventListener('click', () => { //match jsx
    console.log('login')

    const email_input = document.querySelector('#email').value; //match jsx
    const pass_input = document.querySelector('#password').value; //match jsx
    const login_error = document.querySelector('#error'); //optional

    fetch('/api/login', { //match api
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email_input, //match api
            password: pass_input //match api
        })
    })

        .then(res => {
            if (res.ok) {
                console.log('Success')
                login_error.style.display = 'none' //optional
                window.location.replace('/')
            } else {
                console.log('Incorrect username/password')
                login_error.style.display = 'block' //optional
            }
        })
        .catch(error => console.log('Error', error))
})