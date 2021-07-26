import React, {useState} from "react";
import Background from "../components/Background";
import "../Stylesheet.css";
import { Checkbox } from '@material-ui/core';
import Popup from "../components/Popup";
import Verification from "./Verification";

function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const [displayVerify, setDisplayVerify] = useState(false);
  return (
      //<div className = "backgroundVideo">
          //<Background/>
    <div id = "signUpBody">
      <span id="signUpText">Get Started</span>
      <span id = "signUpText2">It's quick and easy.</span>
      <div>
        <input
          className ="loginTextBoxes"
          onChangeText={(first) => setFirstName(first)}
          placeholder="First Name"
          keyboardType="default"
        />
      </div>
      <div>
        <input
          className = "loginTextBoxes"
          onChangeText={(last) => setLastName(last)}
          placeholder="Last Name"
          keyboardType="default"
        />
      </div>
      <div>
        <input
          className = "loginTextBoxes"
          onChangeText={(address) => setEmail(address)}
          placeholder="E-mail"
          keyboardType="email-address"
        />
      </div>
      <div>
        <input
          className = "loginTextBoxes"
          onChangeText={(pass) => setPassword(pass)}
          placeholder="Password"
          type="password"
          keyboardType="default"
          secureTextEntry={true}
        />
      </div>
      <div>
        <input
          className = "loginTextBoxes"
          onChangeText={(confirm) => setconfirmPassword(confirm)}
          placeholder="Confirm Password"
          type="password"
          keyboardType="default"
          secureTextEntry={true}
        />
      </div>
      <span><Checkbox color='primary'/> I agree to the <span style={{color: '#476791'}}>Terms and Conditions.</span></span>
      <div>
        <button title="SignUpButton" id = "signUpButton" onClick={() => setDisplayVerify(true)}>
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