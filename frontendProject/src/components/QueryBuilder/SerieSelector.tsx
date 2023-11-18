import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { AiOutlineClear } from "react-icons/ai";
import { useGlobalStore } from "@/pages/api/Global";

// Functional component that renders the SerieSelector component
// selectedSeries is the list of selected series
// setSelectedSeries is the function to set the selected series
function SerieSelector({
  selectedSeries,
  setSelectedSeries,
}: {
  selectedSeries: string[];
  setSelectedSeries: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const series = useGlobalStore((state) => state.data?.series ?? {});
  const [filter, setFilter] = useState<string>("");

  const [displayedSeries, setDisplayedSeries] = useState<string[]>(
    Object.keys(series)
  );
  // useEffect hook to update the displayed series when the series change
  useEffect(() => {
    setDisplayedSeries(Object.keys(series));
  }, [series]);

  // Render the series
  const renderSeries = displayedSeries
    .slice(0, showAll ? displayedSeries.length : 100)
    .map((serie, index) => (
      <Col xs={12} sm={3} xl={2} key={index}>
        <Form.Check
          inline
          type="checkbox"
          id={series[serie]}
          label={series[serie]}
          checked={selectedSeries.includes(serie)}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const { checked } = event.target;
            if (checked) {
              setSelectedSeries([...selectedSeries, serie]);
            } else {
              const filteredSeries = selectedSeries.filter(
                (selectedSerie) => selectedSerie !== serie
              );
              setSelectedSeries(filteredSeries);
            }
          }}
        ></Form.Check>
      </Col>
    ));
  // Handle the change in the input to filter the series
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const value = filter;
    const filteredSeries = Object.keys(series).filter((serie) =>
      series[serie].toLowerCase().includes(value.toLowerCase())
    );
    setShowAll(false);
    setDisplayedSeries(filteredSeries);
  };

  // Handle the clear selection button to clear the selected series
  const handleClearSelection = () => {
    setSelectedSeries([]);
    setDisplayedSeries(Object.keys(series));
  };

  // Render the component
  return (
    <div>
      <div className="d-flex justify-content-between">
        <Form onSubmit={handleSubmit} className="w-100">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter serie"
              onChange={(e) => setFilter(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>

        <div>
          <Button
            variant="danger"
            size="sm"
            className="ms-3"
            onClick={handleClearSelection}
          >
            <AiOutlineClear size={20}></AiOutlineClear>
          </Button>
        </div>
      </div>
      <Row className="gx-0 mt-3 overflow-auto" style={{ maxHeight: "300px" }}>
        {renderSeries}
        <Button
          variant="link"
          className="text-decoration-none"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less" : "Show more"}
        </Button>
      </Row>
    </div>
  );
}

export default SerieSelector;
