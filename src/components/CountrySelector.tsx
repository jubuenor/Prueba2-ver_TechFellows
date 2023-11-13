import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { countries } from "@/utils/countries";
import { AiOutlineClear } from "react-icons/ai";

function CountrySelector() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [displayedCountries, setDisplayedCountries] = useState(countries);

  const renderCountries = displayedCountries.map((country, index) => (
    <Col xs={6} sm={2} xl={1} key={index}>
      <Form.Check
        inline
        type="checkbox"
        id={country.country_code}
        label={country.short_name}
        checked={selectedCountries.includes(country.country_code)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { checked } = event.target;
          if (checked) {
            setSelectedCountries([...selectedCountries, country.country_code]);
          } else {
            const filteredCountries = selectedCountries.filter(
              (selectedCountry) => selectedCountry !== country.country_code
            );
            setSelectedCountries(filteredCountries);
          }
        }}
      ></Form.Check>
    </Col>
  ));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredCountries = countries.filter((country) =>
      country.short_name.toLowerCase().includes(value.toLowerCase())
    );
    setDisplayedCountries(filteredCountries);
  };

  const handleClearSelection = () => {
    setSelectedCountries([]);
    setDisplayedCountries(countries);
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
