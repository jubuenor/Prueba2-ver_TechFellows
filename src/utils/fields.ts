import type { Field, RuleType } from "react-querybuilder";
import { defaultOperators } from "react-querybuilder";
import { countries } from "./countries";
import { regions } from "./regions";
import { test } from "./test";

export const validator = (r: RuleType) => !!r.value;

let distinct = Array.from(
  new Set(
    test.map((t) =>
      t.series_code.split(".")[0] == "NY" ? t.series_code.split(".")[1] : ""
    )
  )
);

console.log(distinct);

export const fields: Field[] = [
  {
    name: "country",
    label: "Country",
    valueEditorType: "select",
    values: countries,
    defaultValue: "Select a country",
    operators: defaultOperators.filter((op) => op.name === "="),
  },
  {
    name: "region",
    label: "Region",
    valueEditorType: "select",
    values: regions,
    defaultValue: "Select a region",
    operators: defaultOperators.filter((op) => op.name === "="),
  },
];
