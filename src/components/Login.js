import React from "react";
import "../Stylesheet.css"
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { useState } from "react";
import Popup from "./Popup";
import SignUpPage from "../pages/SignUpPage";
import Verification from "../pages/Verification";
import PasswordReset from "../pages/PasswordReset";

function Login() {
  const doLogin = async (event) => {
    event.preventDefault();
    alert("doIt()");
  };

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
