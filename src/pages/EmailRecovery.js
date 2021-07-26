import React from "react";
import { Link } from "react-router-dom";
function EmailRecovery() {
  return (  <span>
    <h1>Check your e-mail</h1>
    <span>We have sent password recovery{'\n'}instructions to your e-mail.</span><br/>
    <span>*Image Placeholder*</span><br/>
    <span>Didn't receive it? <span style={{color: '#163F74'}}>Resend</span></span>
    <p><Link to="/Dashboard">*Click to get to dashboard*</Link></p>
    
</span>);
}
export default EmailRecovery;
