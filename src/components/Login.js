// Login Component which displays the login portion of the login page screen. Also has the triggers for the signup and
// Password reset pages at the bottom

import React from "react";
import "../Stylesheet.css"
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { useState } from "react";
import Popup from "./Popup";
import SignUpPage from "../pages/SignUpPage";
import Verification from "../pages/Verification";
import PasswordReset from "../pages/PasswordReset";
import { FormControl } from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";
import { FilledInput } from "@material-ui/core";
import { loginCall } from "../calls/loginCall";

function Login() {
var loginName;
var loginPassword;
const doLogin = async event => {
  event.preventDefault();
  const email_input = loginName.value; //match frontend
  const pass_input = loginPassword.value; //match frontend
      if(!email_input || !pass_input) return
      console.log(email_input)
      console.log(pass_input)
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
        window.location.replace('http://jumble.site:5000/#/Dashboard') //match url
    } else {
        console.log('Incorrect username/password')
    }
}


  const [displaySignup, setDisplaySignup] = useState(false);
  const [displayResetPassword, setDisplayResetPassword] = useState(false);
  return (

    <div id="loginDiv"> 
      <span id="inner-title">Welcome Back</span>
      <form>
        <br />
        <input type="text" className="loginTextBoxes" id="loginName" placeholder="E-mail" ref={(c) => loginName = c}/>
        <br />
        <input type="password" className="loginTextBoxes" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} />
        <br />
      </form>
          <input
          type="submit"
          id="loginButton"
          class="buttons"
          value="Login"
          onClick={doLogin}
        />
        <span id="forgotPasswordText" onClick={() => setDisplayResetPassword(true)}>Forgot Password?</span>
      <span id = "signUpButtonText">Don't have an account? <span id="signUpLink" onClick={() => setDisplaySignup(true)}>Sign Up</span></span>
      <span id="loginResult"></span> 

      <Popup trigger={displaySignup} setTrigger={setDisplaySignup}>
        <SignUpPage/>
      </Popup>

      <Popup trigger={displayResetPassword} setTrigger={setDisplayResetPassword}>
        <PasswordReset/>
      </Popup>

    </div>
  );
}
export default Login;
