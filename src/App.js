// App.js which controls the display of the app. I used react router -> (npm install --save react-router-dom)
// to route the pages as well as Materia UI -> (npm install @material-ui/core) for some of
// The buttons/features like the checkbox for the signup screen or buttons on the tracks page
// Let me know if you have any questions

import React from "react";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SignUpPage from "./pages/SignUpPage";
import Genre from "./pages/Genre";
import Track from "./pages/Track";
import LikedSongs from "./pages/LikedSongs";
import DislikedSongs from "./pages/DislikedSongs";

function App() {
  return (
    <Router> 
      <div>
        <Switch>
        <Route path="/" exact component={LoginPage}/>
        <Route path="/Login" component={LoginPage}/>
        <Route path="/SignUp" component={SignUpPage}/>
        <Route path="/Dashboard" component={Genre}/>
        <Route path="/Track" component={Track}/>
        <Route path="/LikedSongs" component={LikedSongs}/>
        <Route path="/DislikedSongs" component={DislikedSongs}/>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
