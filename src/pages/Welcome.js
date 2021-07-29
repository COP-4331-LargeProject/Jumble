// Welcome Component. Mistakenly put it in the pages folder but it displays the title and sub text for the Jumble app.
import React from "react";

function Welcome() {
  return (
      <div id="welcomeDiv">
        <span id="welcomeBody">
            <span className="welcomeText">Jumble</span><br/>
            <span id="welcomeSubText">Find the perfect songs for your {"\n"} mood on Jumble.</span>
        </span>
    </div>
  );

}
export default Welcome;
