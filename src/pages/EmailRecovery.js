// Display's the email recovery page within poppup

import React from "react";
import { Link } from "react-router-dom";
function EmailRecovery() {
  return (  <span style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
    <h1 id="emailHeader">Check your e-mail</h1>
    <span id = "emailText">We have sent password recovery{'\n'}instructions to your e-mail.</span><br/>
    <img id="emailImage" src= {require('../Assets/Images/verify.png').default} alt="cannot display"/><br/>
</span>);
}
export default EmailRecovery;
