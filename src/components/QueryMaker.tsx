import React from "react";
import CountrySelector from "./CountrySelector";
import SerieSelector from "./SerieSelector";
import YearSelector from "./YearSelector";
import { Accordion } from "react-bootstrap";
import { BiWorld } from "react-icons/bi";
import { AiFillDatabase } from "react-icons/ai";
import { BsCalendarWeek } from "react-icons/bs";

function QueryMaker() {
  return (
    <div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Countries{" "}
            <span className="ms-2">
              <BiWorld size={20} color="dodgerblue"></BiWorld>
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <CountrySelector></CountrySelector>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            Series{" "}
            <span className="ms-2">
              <AiFillDatabase size={20} color="dodgerblue"></AiFillDatabase>
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <SerieSelector></SerieSelector>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Years
            <span className="ms-2">
              <BsCalendarWeek size={20} color="dodgerblue"></BsCalendarWeek>
            </span>
          </Accordion.Header>
          <Accordion.Body>
            <YearSelector></YearSelector>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default QueryMaker;
