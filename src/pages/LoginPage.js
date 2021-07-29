import React from "react";
import Login from "../components/Login";
import Background from "../components/Background";
import "../Stylesheet.css";
import Welcome from "./Welcome";

const LoginPage = () => {
  const windowWidth = window.innerWidth - 30;
  const windowHeight = window.innerHeight - 30;
  return ( 
    <div>
    <Background/>
    <div id="loginBody" style = {{height: windowHeight, width: windowWidth}}>
      <Welcome />
      <Login />
    </div> </div>
  );
};

export default LoginPage;
