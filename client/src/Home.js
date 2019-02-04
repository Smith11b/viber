import React from "react";
import MainVideo from "./component/MainVideo";

import RecordSection from "./component/RecordSection";

function Home(props) {
  return (
    <div>
      <div className="App">
        <MainVideo  />
        <RecordSection vidStart = {props.vidStart} />
      </div>
    </div>
  );
}

export default Home;
