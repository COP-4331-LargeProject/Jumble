//register
const email_input = document.querySelector('email').value //matches frontend
const pass_input = document.querySelector('password').value //matches frontend
const confirm_pass_input = document.querySelector('confirmPassword').value //matches frontend
const first_name_input = document.querySelector('firstName').value //matches frontend
const last_name_input = document.querySelector('lastName').value //matches frontend

async function register() {
  if(!email_input || !pass_input || !first_name_input || !last_name_input) return
  if(pass_input != confirm_pass_input) return

  const res = await fetch('/api/register', { //matches api
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email_input, //matches api
      password: pass_input, //matches api
      first_name: first_name_input, //matches api
      last_name: last_name_input //matches api
    })
  })

  if(!res.ok) {
    console.log('Error')
  } else {
    window.location.replace('/login') //match url
  }
}
