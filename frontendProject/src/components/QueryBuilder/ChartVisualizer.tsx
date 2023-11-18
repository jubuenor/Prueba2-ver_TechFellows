import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Form, Col, Row } from "react-bootstrap";
import { Results } from "@/types/query";
import PostQuery from "./PostQuery";
import { useGlobalStore } from "@/pages/api/Global";
import ChartInfo from "./ChartInfo";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

function ChartVisualizer({
  results,
  countries,
  series,
  years,
  query,
}: {
  results: Results;
  countries: string[];
  series: string[];
  years: number[];
  query: string;
}) {
  const globalData = useGlobalStore((state) => state.data);
  const [selectedCountry, setSelectedCountry] = useState<string>(countries[0]);
  const [data, setData] = useState<{ label: string; data: number[] }[]>([
    { label: "", data: [] },
  ]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: selectedCountry,
      },
    },
  };
  const renderCountries = countries.map((country, index) => (
    <option value={country} key={index}>
      {globalData?.countries[country]}
    </option>
  ));

  useEffect(() => {
    const newData = series.map((serie) => {
      return {
        label: serie,
        data: years.map((year) => results[selectedCountry][serie][year] || 0),
      };
    });
    setData(newData);
  }, [selectedCountry]);

  const renderSeriesInfo = series.map((serie, index) => (
    <ChartInfo
      key={index}
      serie={serie}
      description={globalData?.series[serie] ?? ""}
    ></ChartInfo>
  ));

  return (
    <Row className="gx-0">
      <Col md={6}>
        <Form.Select
          className="mb-3"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const value = event.target.value;
            setSelectedCountry(value);
          }}
        >
          {renderCountries}
        </Form.Select>
        <Bar data={{ labels: years, datasets: data }} options={options} />
        <div className="mt-3">{renderSeriesInfo}</div>
      </Col>
      <Col md={6}>
        <PostQuery query={query}></PostQuery>
      </Col>
    </Row>
  );
}

export default ChartVisualizer;
