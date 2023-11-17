import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { AiOutlineClear } from "react-icons/ai";
import { useGlobalStore } from "@/pages/api/Global";

function CountrySelector({
  selectedCountries,
  setSelectedCountries,
}: {
  selectedCountries: string[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const countries = useGlobalStore((state) => state.data?.countries ?? {});
  console.log(countries);

  const [displayedCountries, setDisplayedCountries] = useState<string[]>(
    Object.keys(countries)
  );

  useEffect(() => {
    setDisplayedCountries(Object.keys(countries));
  }, [countries]);

  const renderCountries = displayedCountries.map((country, index) => (
    <Col xs={6} sm={2} xl={1} key={index}>
      <Form.Check
        inline
        type="checkbox"
        id={country}
        label={countries[country]}
        checked={selectedCountries.includes(country)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { checked } = event.target;
          if (checked) {
            setSelectedCountries([...selectedCountries, country]);
          } else {
            const filteredCountries = selectedCountries.filter(
              (selectedCountry) => selectedCountry !== country
            );
            setSelectedCountries(filteredCountries);
          }
        }}
      ></Form.Check>
    </Col>
  ));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredCountries = Object.keys(countries).filter((country) =>
      countries[country].toLowerCase().includes(value.toLowerCase())
    );
    setDisplayedCountries(filteredCountries);
  };

  const handleClearSelection = () => {
    setSelectedCountries([]);
    setDisplayedCountries(Object.keys(countries));
  };
  return (
    <div>
      <div className="d-flex justify-content-between">
        <Form.Group className="w-100">
          <Form.Control
            type="text"
            placeholder="Enter country"
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Button
          variant="danger"
          size="sm"
          className="ms-3"
          onClick={handleClearSelection}
        >
          <AiOutlineClear size={20}></AiOutlineClear>
        </Button>
      </div>
      <Row className="gx-0 mt-3 overflow-auto" style={{ maxHeight: "300px" }}>
        {renderCountries}
      </Row>
    </div>
  );
}

export default CountrySelector;
