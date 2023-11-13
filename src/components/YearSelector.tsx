import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { RxSlider } from "react-icons/rx";
import { BsHandIndex } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";

const initYear = 1970;
const finalYear = 2100;

function YearSelector() {
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [range, setRange] = useState([initYear, finalYear]);
  const [showManual, setShowManual] = useState(false);

  const renderYears = () => {
    return Array.from({ length: finalYear - initYear + 1 }, (_, i) => (
      <Form.Check
        inline
        key={i}
        type="checkbox"
        id={i.toString()}
        label={(initYear + i).toString()}
        checked={selectedYears.includes(i.toString())}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { checked } = event.target;
          if (checked) {
            setSelectedYears([...selectedYears, i.toString()]);
          } else {
            const filteredYears = selectedYears.filter(
              (selectedYear) => selectedYear !== i.toString()
            );
            setSelectedYears(filteredYears);
          }
        }}
      ></Form.Check>
    ));
  };

  const handleClearSelection = () => {
    setSelectedYears([]);
    setRange([initYear, finalYear]);
  };

  const handleShowManual = () => {
    handleClearSelection();
    setShowManual(!showManual);
  };
  return (
    <div>
      <div className="d-flex justify-content-between">
        <Button
          variant="primary"
          size="sm"
          className="mb-2"
          onClick={handleShowManual}
        >
          {showManual ? "Slider" : "Manual"}
          <span className="ms-2">
            {showManual ? (
              <RxSlider size={20} color="white"></RxSlider>
            ) : (
              <BsHandIndex size={20} color="white"></BsHandIndex>
            )}
          </span>
        </Button>
        <Button size="sm" variant="danger" onClick={handleClearSelection}>
          <AiOutlineClear size={20}></AiOutlineClear>
        </Button>
      </div>
      {showManual ? (
        <div>{renderYears()}</div>
      ) : (
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <strong> From: {range[0]}</strong>
            </div>
            <div>
              <strong> To: {range[1]}</strong>
            </div>
          </div>
          <RangeSlider
            min={initYear}
            max={finalYear}
            step={1}
            value={range}
            onInput={setRange}
          ></RangeSlider>
        </div>
      )}
    </div>
  );
}

export default YearSelector;
