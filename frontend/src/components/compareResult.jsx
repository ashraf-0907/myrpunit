import { useState, useEffect } from "react";
import "./form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LineCharts from "./Graphs/lineGraph.component.jsx";
import OptionForm from "./OptionForm.component.jsx";

function CompareResult() {
  const [selectedOption, setSelectedOption] = useState("");
  const [params, setParams] = useState({ result1: null, result2: null });
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");
//   const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a delay of 2 seconds before fetching data
        setLoadingMessage("Loading data... (Please wait)");
        setTimeout(async () => {
          const response = await axios.get("http://localhost:8080/compareResult");
          setParams(response.data);
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (params.result1 && params.result2) {
      setDataLoaded(true);
    }
  }, [params]);

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
  };

  const renderGraphs = () => {
    return (
      <div>
        <h1 style={{ width: "100%", color: "#fff" }}>Result Comparison</h1>
        <div style={{ width: "150vh" }}>
          <LineCharts param={params} option={selectedOption} />
        </div>
        <div
          className="container"
          style={{
            paddingLeft: "20px",
            marginTop: "10px",
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            paddingTop: "10px",
            paddingBottom: "10px",
            fontSize: "18px",
            color: "#36454F",
          }}
        >
          <OptionForm setSelectedOption={handleOptionSelection} />
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
