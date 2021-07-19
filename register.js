//register
document.querySelector('#register-btn').addEventListener('click', () => { //match jsx
  console.log('register')

  const email_input = document.querySelector('#email') //match jsx
  const pass_input = document.querySelector('#password') //match jsx
  const first_name_input = document.querySelector('#first_name') //match jsx
  const last_name_input = document.querySelector('#last_name') //match jsx
  const register_error = document.querySelector('#error') //optional

  fetch('/api/register', { //match api
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email_input.value, //match api
      password: pass_input.value //match api
      first_name: first_name_input.value, //match api
      last_name: last_name_input.value //match api
    })
  })

    .then(res => {
      if (res.ok) {
        console.log('Success')
        window.location.replace('/verification')
      } else {
        console.log('Error')
        login_error.style.display = 'block' //optional
      }
    })
    .catch(error => console.log('Error', error))
})
