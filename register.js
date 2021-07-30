//register
const email_input = document.querySelector('email').value //match frontend
const pass_input = document.querySelector('password').value //match frontend
const first_name_input = document.querySelector('first_name').value //match frontend
const last_name_input = document.querySelector('last_name').value //match frontend

async function register() {
  if(!email_input || !pass_input || !first_name_input || !last_name_input) return

  const res = fetch('/api/register', { //match api
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email_input, //match api
      password: pass_input, //match api
      first_name: first_name_input, //match api
      last_name: last_name_input //match api
    })
  })

  if(!res.ok) {
    console.log('Error')
  } else {
    window.location.replace('/login') //match url
  }
}
