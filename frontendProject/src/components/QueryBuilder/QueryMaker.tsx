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
import ReCAPTCHA from "react-google-recaptcha";
const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

// Functional component that renders the QueryMaker component
function QueryMaker() {
  // States to store the selected countries, series, years, loading and results
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<Years>({
    manual: true,
    years: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Results>({});
  const [query, setQuery] = useState<string>("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  // useEffect hook to load the query from the storage
  useEffect(() => {
    const query = getQueryStorage();
    if (query !== null) {
      setSelectedCountries(query.countries);
      setSelectedSeries(query.series);
      setSelectedYears(query.years);
      removeQueryStorage();
    }
  }, []);

  // Mutation to check the query and get the results
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

  // Handle the run query button
  const handleRunQuery = () => {
    setLoading(true);
    runQueryMutation.mutate({
      countries: selectedCountries,
      series: selectedSeries,
      years: selectedYears,
    });
  };

  // Handle the Captcha changes
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  // Render the component
  return (
    <>
      {loading && <Loading></Loading>}

      <div>
        {query === ""
          ? (
            <>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {selectedCountries.length === 0
                      ? (
                        <span className="me-3">
                          <RiErrorWarningLine
                            size={20}
                            color="orange"
                          >
                          </RiErrorWarningLine>
                        </span>
                      )
                      : (
                        <span className="me-3">
                          <BsFillCheckCircleFill
                            size={20}
                            color="green"
                          >
                          </BsFillCheckCircleFill>
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
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    {selectedSeries.length === 0
                      ? (
                        <span className="me-3">
                          <RiErrorWarningLine
                            size={20}
                            color="orange"
                          >
                          </RiErrorWarningLine>
                        </span>
                      )
                      : (
                        <span className="me-3">
                          <BsFillCheckCircleFill
                            size={20}
                            color="green"
                          >
                          </BsFillCheckCircleFill>
                        </span>
                      )}
                    Series
                    <span className="ms-2">
                      <AiFillDatabase
                        size={20}
                        color="dodgerblue"
                      >
                      </AiFillDatabase>
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <SerieSelector
                      selectedSeries={selectedSeries}
                      setSelectedSeries={setSelectedSeries}
                    />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    {selectedYears.years.length === 0
                      ? (
                        <span className="me-3">
                          <RiErrorWarningLine
                            size={20}
                            color="orange"
                          >
                          </RiErrorWarningLine>
                        </span>
                      )
                      : (
                        <span className="me-3">
                          <BsFillCheckCircleFill
                            size={20}
                            color="green"
                          >
                          </BsFillCheckCircleFill>
                        </span>
                      )}
                    Years
                    <span className="ms-2">
                      <BsCalendarWeek
                        size={20}
                        color="dodgerblue"
                      >
                      </BsCalendarWeek>
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <YearSelector
                      selectedYears={selectedYears}
                      setSelectedYears={setSelectedYears}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <div className="mt-4">
                <ReCAPTCHA
                  sitekey={recaptchaSiteKey}
                  onChange={handleRecaptchaChange}
                />
              </div>

              <div className="mt-4">
                <Button
                  onClick={handleRunQuery}
                  disabled={selectedCountries.length === 0 ||
                    selectedSeries.length === 0 ||
                    selectedYears.years.length === 0 ||
                    !recaptchaToken}
                >
                  Run Query
                </Button>
              </div>
            </>
          )
          : (
            <div>
              <ChartVisualizer
                results={results}
                years={selectedYears.manual ? selectedYears.years : Array.from(
                  {
                    length: selectedYears.years[1] - selectedYears.years[0],
                  },
                  (value, index) => selectedYears.years[0] + index,
                )}
                countries={selectedCountries}
                series={selectedSeries}
                query={query}
                setQuery={setQuery}
              />
            </div>
          )}
      </div>
    </>
  );
}

export default QueryMaker;
