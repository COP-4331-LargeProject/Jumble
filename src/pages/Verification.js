// The Verification page

import React from "react";

function Verification() {
  return (    
    <span style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <h1 id="verifyHeader">Thanks for signing up!</h1>
      <span id="verifyText">Please verify your e-mail address so <br/>you can start listening!</span>
      <img id="verifyImage" src= {require('../Assets/Images/signup.png').default} alt="cannot display"/>
    </span>
    );
}
export default Verification;
