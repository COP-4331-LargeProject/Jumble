// This is the popup component that is used for each popup that is displayed to the user. There is still the issue
// of the previous popup still showing. 

import React from "react";
import "../Stylesheet.css";

function Popup(props) {
  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
            <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
            {props.children}
        </div>
    </div>
  ) : "";
}

export default Popup;
