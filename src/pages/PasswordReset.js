// Displays the password reset page within the popup component

import React, { useState } from "react";
import Popup from "../components/Popup";
import EmailRecovery from "./EmailRecovery";

function PasswordReset() {
  const [email, setEmail] = useState(false);
  // Hook to display the Email Recovery page
  const [displayEmailRecovery, setDisplayEmailRecovery] = useState('');
  return (
    <span>
      <span>*Image Placeholder*</span><br/>
      <h1>Forgot your password?</h1>
      <span>Enter your registered e-mail below to receive reset instructions</span>
      <input
          className = "loginTextBoxes"
          onChangeText={(info) => setEmail(info)}
          placeholder="E-mail"
        />
      <button id = "resetButton" onClick={() => setDisplayEmailRecovery(true)}>
          <span>Reset</span>
      </button>

      <Popup trigger={displayEmailRecovery} setTrigger={setDisplayEmailRecovery}>
        <EmailRecovery/>
      </Popup>
    </span>
  );
}
export default PasswordReset;
