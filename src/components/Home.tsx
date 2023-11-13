import React, { useState } from "react";
import { QueryBuilderDnD } from "@react-querybuilder/dnd";
import * as ReactDnD from "react-dnd";
import * as ReactDndHtml5Backend from "react-dnd-html5-backend";
import type { RuleGroupType } from "react-querybuilder";
import { QueryBuilder } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import { QueryBuilderBootstrap } from "@react-querybuilder/bootstrap";
import { fields } from "@/utils/fields";
import "bootstrap-icons/font/bootstrap-icons.scss";
import "bootstrap/scss/bootstrap.scss";

const initialQuery: RuleGroupType = { combinator: "and", rules: [] };

function Home() {
  const [query, setQuery] = useState(initialQuery);
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center ">
      <div className="w-50">
        <QueryBuilderDnD dnd={{ ...ReactDnD, ...ReactDndHtml5Backend }}>
          <QueryBuilderBootstrap>
            <QueryBuilder
              query={query}
              onQueryChange={(q) => setQuery(q)}
              fields={fields}
              showCloneButtons
              showCombinatorsBetweenRules
              controlClassnames={{ queryBuilder: "queryBuilder-branches" }}
            />
          </QueryBuilderBootstrap>
        </QueryBuilderDnD>
      </div>
    </div>
  );
}

export default Home;
