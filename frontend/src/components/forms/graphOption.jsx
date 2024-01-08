import { useState } from "react";

function GraphForm({setSelectedGraph}){
    const [selected, setSelected] = useState('r');

    const handleOptionChange = (event) => {
        const { value } = event.target;
        setSelected(value);
        setSelectedGraph(value);
    };

    console.log("worked");

    return (
        <div className="containers">
        <div className="radio-container">
            <label className="radio-label">
                <input
                    type="radio"
                    value="l"
                    name="g1"
                    className="radio-input"
                    checked={selected === 'l'}
                    onChange={handleOptionChange}
                />
                Line Graph
            </label>
            <label className="radio-label">
                <input
                    type="radio"
                    value="b"
                    name="g2"
                    className="radio-input"
                    checked={selected === 'b'}
                    onChange={handleOptionChange}
                />
                Bar Graph
            </label>
            <label className="radio-label">
                <input
                    type="radio"
                    value="r"
                    name="g3"
                    className="radio-input"
                    checked={selected === 'r'}
                    onChange={handleOptionChange}
                />
                Radar Chart
            </label>
        </div>
        </div>
    );
}


export default GraphForm