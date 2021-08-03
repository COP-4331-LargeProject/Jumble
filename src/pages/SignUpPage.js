import React, {useState} from "react";
import Background from "../components/Background";
import "../Stylesheet.css";
import { Checkbox } from '@material-ui/core';
import Popup from "../components/Popup";
import Verification from "./Verification";


function SignUpPage() {

  var firstName = "";
  var lastName = "";
  var password = "";
  var confirmPassword = "";
  var email = "";
  const [displayVerify, setDisplayVerify] = useState(false);
const register = async event =>  {
  
  //register
  const email_input = email.value //match frontend
  const pass_input = password.value //match frontend
  const first_name_input = firstName.value //match frontend
  const last_name_input = lastName.value //match frontend
  console.log(email_input);
  if(!email_input || !pass_input || !first_name_input || !last_name_input) return

  if(pass_input !== confirmPassword) return
  setDisplayVerify(true);
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
   console.log(res);
  if(!res.ok) {
    console.log('Error')
  } else {
    //window.location.replace('/login') //match url
    console.log('Success')
  }
}

  // Verifcation popup after signing up

  return (
    <div id = "signUpBody">
      <span id="signUpText">Get Started</span>
      <span id = "signUpText2">It's quick and easy.</span>
      <form id="signUpBoxes">
        <input
          className ="loginTextBoxes"
          ref={(c) => firstName = c}
          placeholder="First Name"
        />
      
        <input
          className = "loginTextBoxes"
          ref={(c) => lastName = c}
          placeholder="Last Name"
        />
   
        <input
          className = "loginTextBoxes"
          ref={(c) => email = c}
          placeholder="E-mail"
        />
  
        <input
          className = "loginTextBoxes"
          ref={(c) => password = c}
          placeholder="Password"
          type="password"
        />
 
        <input
          className = "loginTextBoxes"
          ref={(c) => confirmPassword = c}
          placeholder="Confirm Password"
          type="password"
        />
      </form>
      <span><Checkbox color='primary'/> I agree to the <span style={{color: '#476791'}}>Terms and Conditions.</span></span>
      <div>
        <button title="SignUpButton" id = "signUpButton" onClick={register}>
          <span id = "signUpButtonText">Sign Up</span>
        </button>
      </div>

      <Popup trigger={displayVerify} setTrigger={setDisplayVerify}>
        <Verification/>
      </Popup>
    </div>
  );
};
export default SignUpPage;