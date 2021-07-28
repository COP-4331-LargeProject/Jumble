//recover password
document.querySelector('verifyButton').addEventListener('click', () => { //match jsx
    console.log('reset password')

    const email_input = document.querySelector('email').value; //match jsx

    fetch('/api/forgotPassword', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email_input, 
        })
    })

        .then(res => {
            if (res.ok) {
                console.log('Success')
                window.location.replace('/login') //remove if redirect is not needed
            } else {
                console.log('Error')
            }
        })
        .catch(error => console.log('Error', error))
})
