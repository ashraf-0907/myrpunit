
import React, { useState, useEffect } from "react";
import axios from "axios";
import LineCharts from "./Graphs/lineGraph.component.jsx";
import BarCharts from "./Graphs/barChart.jsx";
import RadarCharts from "./Graphs/pieChart.jsx";
import OptionForm from "./forms/OptionForm.component.jsx";
import './compareResult.css';
import GraphForm from "./forms/graphOption.jsx";

function CompareResult() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectGraph, setSelectedGraph] = useState("");
  const [params, setParams] = useState({ result1: null, result2: null });
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMessage("Loading data... (Please wait)");
        const response = await axios.get("http://localhost:8080/compareResult");
        setParams(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(params);

  useEffect(() => {
    if (params.result1 && params.result2) {
      setDataLoaded(true);
    }
  }, [params]);

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
  };

  const handleOptionGraph = (g) => {
    setSelectedGraph(g);
  };

  const renderGraphs = () => {
    return (
      <div>
        <h1>Result Comparison</h1>
        <div style={{ width: "130vh" }}>
        {
          selectGraph ==='l'?<LineCharts param={params} option={selectedOption} />:selectGraph ==='b'? <BarCharts param={params} option={selectedOption} />:<RadarCharts param={params} option={selectedOption} />
        }
          {/* <BarCharts param={params} option={selectedOption} /> */}
        </div>
        <div className="container1">
          <OptionForm setSelectedOption={handleOptionSelection} />
          <GraphForm setSelectedGraph={handleOptionGraph} />
        </div>
      </div>
    );
  };

  return (
    <div>
      {dataLoaded ? (
        renderGraphs()
      ) : (
        <div>{loadingMessage}</div>
      )}
    </div>
  );
}

export default CompareResult;

