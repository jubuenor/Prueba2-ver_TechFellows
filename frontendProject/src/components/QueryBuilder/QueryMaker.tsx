import React, { useEffect, useState } from "react";
import CountrySelector from "./CountrySelector";
import SerieSelector from "./SerieSelector";
import YearSelector from "./YearSelector";
import { Accordion, Button } from "react-bootstrap";
import { BiWorld } from "react-icons/bi";
import { AiFillDatabase } from "react-icons/ai";
import { BsCalendarWeek } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useMutation } from "react-query";
import { checkQuery } from "@/pages/api/Query";
import Loading from "../Loading";
import { Results, Years } from "@/types/query";
import ChartVisualizer from "./ChartVisualizer";
import { getQueryStorage, removeQueryStorage } from "@/utils/storage";

function QueryMaker() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<Years>({
    manual: true,
    years: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Results>({});
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const query = getQueryStorage();
    if (query !== null) {
      setSelectedCountries(query.countries);
      setSelectedSeries(query.series);
      setSelectedYears(query.years);
      removeQueryStorage();
    }
  }, []);

  const runQueryMutation = useMutation({
    mutationFn: checkQuery,
    onSuccess: (response) => {
      setQuery(response.data.query);
      setResults(response.data.results);
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      console.log(error);
    },
  });

  const handleRunQuery = () => {
    setLoading(true);
    runQueryMutation.mutate({
      countries: selectedCountries,
      series: selectedSeries,
      years: selectedYears,
    });
  };

  return (
    <>
      {loading && <Loading></Loading>}

      <div>
        {query === "" ? (
          <>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  {selectedCountries.length === 0 ? (
                    <span className="me-3">
                      <RiErrorWarningLine
                        size={20}
                        color="orange"
                      ></RiErrorWarningLine>
                    </span>
                  ) : (
                    <span className="me-3">
                      <BsFillCheckCircleFill
                        size={20}
                        color="green"
                      ></BsFillCheckCircleFill>
                    </span>
                  )}
                  Countries
                  <span className="ms-2">
                    <BiWorld size={20} color="dodgerblue"></BiWorld>
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <CountrySelector
                    selectedCountries={selectedCountries}
                    setSelectedCountries={setSelectedCountries}
                  ></CountrySelector>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  {selectedSeries.length === 0 ? (
                    <span className="me-3">
                      <RiErrorWarningLine
                        size={20}
                        color="orange"
                      ></RiErrorWarningLine>
                    </span>
                  ) : (
                    <span className="me-3">
                      <BsFillCheckCircleFill
                        size={20}
                        color="green"
                      ></BsFillCheckCircleFill>
                    </span>
                  )}
                  Series
                  <span className="ms-2">
                    <AiFillDatabase
                      size={20}
                      color="dodgerblue"
                    ></AiFillDatabase>
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <SerieSelector
                    selectedSeries={selectedSeries}
                    setSelectedSeries={setSelectedSeries}
                  ></SerieSelector>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  {selectedYears.years.length === 0 ? (
                    <span className="me-3">
                      <RiErrorWarningLine
                        size={20}
                        color="orange"
                      ></RiErrorWarningLine>
                    </span>
                  ) : (
                    <span className="me-3">
                      <BsFillCheckCircleFill
                        size={20}
                        color="green"
                      ></BsFillCheckCircleFill>
                    </span>
                  )}
                  Years
                  <span className="ms-2">
                    <BsCalendarWeek
                      size={20}
                      color="dodgerblue"
                    ></BsCalendarWeek>
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <YearSelector
                    selectedYears={selectedYears}
                    setSelectedYears={setSelectedYears}
                  ></YearSelector>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <div className="mt-4">
              <Button
                onClick={handleRunQuery}
                disabled={
                  selectedCountries.length === 0 ||
                  selectedSeries.length === 0 ||
                  selectedYears.years.length === 0
                    ? true
                    : false
                }
              >
                Run Query
              </Button>
            </div>
          </>
        ) : (
          <div>
            <ChartVisualizer
              results={results}
              years={
                selectedYears.manual
                  ? selectedYears.years
                  : Array.from(
                      {
                        length: selectedYears.years[1] - selectedYears.years[0],
                      },
                      (value, index) => selectedYears.years[0] + index
                    )
              }
              countries={selectedCountries}
              series={selectedSeries}
              query={query}
            ></ChartVisualizer>
          </div>
        )}
      </div>
    </>
  );
}

export default QueryMaker;
