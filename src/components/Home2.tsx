import React from "react";
import QueryMaker from "./QueryMaker";

function Home() {
  return (
    <div className="p-5">
      <div>
        <h1>
          Welcome to <strong>Query Builder App</strong>
        </h1>
      </div>
      <div>
        <QueryMaker></QueryMaker>
      </div>
    </div>
  );
}

export default Home;
