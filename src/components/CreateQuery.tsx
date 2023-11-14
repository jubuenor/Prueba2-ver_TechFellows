import React, { useState } from "react";
import QueryMaker from "./QueryBuilder/QueryMaker";

function CreateQuery() {
  return (
    <div className="p-5 ">
      <div className="mb-4">
        <h1>
          <strong>Query Builder</strong>
        </h1>
      </div>
      <div>
        <QueryMaker></QueryMaker>
      </div>
    </div>
  );
}

export default CreateQuery;
