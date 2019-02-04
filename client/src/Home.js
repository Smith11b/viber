import React from "react";
import MainVideo from "./component/MainVideo";

import RecordSection from "./component/RecordSection";

function Home() {
  return (
    <div>
      <div className="App">
        <MainVideo />
        <RecordSection />
      </div>
    </div>
  );
}

export default Home;
