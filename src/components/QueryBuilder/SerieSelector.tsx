import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { series } from "@/utils/series";
import { AiOutlineClear } from "react-icons/ai";

function SerieSelector({
  selectedSeries,
  setSelectedSeries,
}: {
  selectedSeries: string[];
  setSelectedSeries: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [displayedSeries, setDisplayedSeries] = useState(series);

  const renderSeries = displayedSeries.map((serie, index) => (
    <Col xs={12} sm={3} xl={2} key={index}>
      <Form.Check
        inline
        type="checkbox"
        id={serie.series_code}
        label={serie.indicator_name}
        checked={selectedSeries.includes(serie.series_code)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { checked } = event.target;
          if (checked) {
            setSelectedSeries([...selectedSeries, serie.series_code]);
          } else {
            const filteredSeries = selectedSeries.filter(
              (selectedSerie) => selectedSerie !== serie.series_code
            );
            setSelectedSeries(filteredSeries);
          }
        }}
      ></Form.Check>
    </Col>
  ));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredSeries = series.filter((serie) =>
      serie.indicator_name.toLowerCase().includes(value.toLowerCase())
    );
    setDisplayedSeries(filteredSeries);
  };

  const handleClearSelection = () => {
    setSelectedSeries([]);
    setDisplayedSeries(series);
  };
  return (
    <div>
      <div className="d-flex justify-content-between">
        <Form.Group className="w-100">
          <Form.Control
            type="text"
            placeholder="Enter serie"
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
        {renderSeries}
      </Row>
    </div>
  );
}

export default SerieSelector;
