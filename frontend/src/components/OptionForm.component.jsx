import { useState } from 'react';
import './OptionForm.css'; // Import your CSS file

function OptionForm({ setSelectedOption }) {
    const [selected, setSelected] = useState('t');

    const handleOptionChange = (event) => {
        const { value } = event.target;
        setSelected(value);
        setSelectedOption(value);
    };

    return (
        <div className="containers">
        <div className="radio-container">
            <label className="radio-label">
                <input
                    type="radio"
                    value="s"
                    name="options"
                    className="radio-input"
                    checked={selected === 's'}
                    onChange={handleOptionChange}
                />
                Sessional
            </label>
            <label className="radio-label">
                <input
                    type="radio"
                    value="e"
                    name="options"
                    className="radio-input"
                    checked={selected === 'e'}
                    onChange={handleOptionChange}
                />
                Exam marks
            </label>
            <label className="radio-label">
                <input
                    type="radio"
                    value="t"
                    name="options"
                    defaultChecked={true}
                    className="radio-input"
                    checked={selected === 't'}
                    onChange={handleOptionChange}
                />
                Total Marks
            </label>
        </div>
        </div>
    );
}

export default OptionForm;
