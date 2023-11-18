import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { RxSlider } from "react-icons/rx";
import { BsHandIndex } from "react-icons/bs";
import { AiOutlineClear } from "react-icons/ai";
import { Years } from "@/types/query";
import { initYear, finalYear } from "@/utils/years";

// Functional component that renders the YearSelector component
// selectedYears is the list of selected years
// setSelectedYears is the function to set the selected years
function YearSelector({
  selectedYears,
  setSelectedYears,
}: {
  selectedYears: Years;
  setSelectedYears: React.Dispatch<React.SetStateAction<Years>>;
}) {
  // Handle the change in the input when the user selects a range of years
  const handleSetRange = (newRange: number[]) => {
    setSelectedYears({
      manual: false,
      years: newRange,
    });
  };

  // Render the years
  const renderYears = () => {
    return Array.from({ length: finalYear - initYear + 1 }, (_, i) => (
      <Form.Check
        inline
        key={i}
        type="checkbox"
        id={i.toString()}
        label={(initYear + i).toString()}
        checked={selectedYears.years.includes(initYear + i)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const { checked } = event.target;
          if (checked) {
            setSelectedYears({
              manual: true,
              years: [...selectedYears.years, initYear + i],
            });
          } else {
            setSelectedYears({
              manual: true,
              years: selectedYears.years.filter(
                (year) => year !== initYear + i
              ),
            });
          }
        }}
      ></Form.Check>
    ));
  };

  // Handle the show manual button to show the slider
  const handleShowManual = () => {
    if (selectedYears.manual)
      setSelectedYears({ manual: false, years: [initYear, finalYear] });
    else setSelectedYears({ manual: true, years: [] });
  };

  // Handle the clear selection button to clear the selected years
  const handleClearSelection = () => {
    if (selectedYears.manual) setSelectedYears({ manual: true, years: [] });
    else setSelectedYears({ manual: false, years: [initYear, finalYear] });
  };

  // Render the component
  return (
    <div>
      <div className="d-flex justify-content-between">
        <Button
          variant="primary"
          size="sm"
          className="mb-2"
          onClick={handleShowManual}
        >
          {selectedYears.manual ? "Slider" : "Manual"}
          <span className="ms-2">
            {selectedYears.manual ? (
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
      {selectedYears.manual ? (
        <div>{renderYears()}</div>
      ) : (
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <strong> From: {selectedYears.years[0]}</strong>
            </div>
            <div>
              <strong> To: {selectedYears.years[1]}</strong>
            </div>
          </div>
          <RangeSlider
            min={initYear}
            max={finalYear}
            step={1}
            value={[selectedYears.years[0], selectedYears.years[1]]}
            onInput={handleSetRange}
          ></RangeSlider>
        </div>
      )}
    </div>
  );
}

export default YearSelector;
