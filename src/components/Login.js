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

function Login() {
  const doLogin = async (event) => {
    event.preventDefault();
    alert("doIt()");
  };

  // Hook that enables the poppup for Signup and password pages
  const [displaySignup, setDisplaySignup] = useState(false);
  const [displayResetPassword, setDisplayResetPassword] = useState(false);
  return (

    <div id="loginDiv"> 
      <span id="inner-title">Welcome Back</span>
      <form onSubmit={doLogin}>
        <br />
        <input type="text" className="loginTextBoxes" id="loginName" placeholder="Username" />
        <br />
        <input type="password" className="loginTextBoxes" id="loginPassword" placeholder="Password" />
        <br />
      </form>
      <Link to="/Dashboard">
          <input
          type="submit"
          id="loginButton"
          class="buttons"
          value="Login"
        />
      </Link>
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
