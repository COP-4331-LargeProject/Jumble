// Displays the password reset page within the popup component

import React, { useState } from "react";
import Popup from "../components/Popup";
import EmailRecovery from "./EmailRecovery";

function PasswordReset() {

  var emailaddress = "";
  const [email, setEmail] = useState(false);
  // Hook to display the Email Recovery page
  const [displayEmailRecovery, setDisplayEmailRecovery] = useState('');
  const email_input = emailaddress.value; //match frontend

  const recover = async event => {
    setDisplayEmailRecovery(true);
    event.preventDefault();
    console.log('reset password')
    if (!email_input) return

    const res = await fetch('/api/forgotPassword', { //match api
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

  return (
    <span style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <img id="passwordImage" src= {require('../Assets/Images/forgot_pass.png').default} alt="cannot display"/>
      <br/>
      <h1 id="passwordHeader">Forgot your password?</h1>
      <span id="passwordText">Enter your registered e-mail below to receive <br/> reset instructions</span>
      <input
          className = "loginTextBoxes"
          ref={(c) => emailaddress = c}
          placeholder="E-mail"
        />
      <button id = "resetButton" onClick={recover}>
          <span>Reset</span>
      </button>

      <Popup trigger={displayEmailRecovery} setTrigger={setDisplayEmailRecovery}>
        <EmailRecovery/>
      </Popup>
    </span>
  );
}
export default PasswordReset;
