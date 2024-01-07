import { useState, useEffect } from "react";
import "./form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form() {
  const [action, setAction] = useState("Your Details");
  const [enroll, setEnroll] = useState("");
  const [faculty, setFaculty] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (action === "Your Details") {
      setAction("Add Student");
    }
  }, [action]); // Whenever 'action' changes, check if it's 'Your Details'

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/", {
        fac: faculty,
        en: enroll,
      });
      console.log("Data sent successfully:", response.data);
      setEnroll("");
      setFaculty("");
    } catch (error) {
      console.error("Error sending data:", error);
      setError("There was an issue submitting the form. Please try again.");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const resetForm = () => {
    setEnroll("");
    setFaculty("");
    setAction("Your Details");
    navigate("/compareResult");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <input
                className="input"
                type="text"
                placeholder="Faculty Number"
                value={faculty}
                name="fac"
                onChange={(e) => setFaculty(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                className="input"
                type="text"
                placeholder="Enrollment Number"
                value={enroll}
                name="en"
                onChange={(e) => setEnroll(e.target.value)}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <div className="submit-container">
              <button className="submit" type="submit" disabled={isButtonDisabled}>
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="text-add">
          Click to{" "}
          <span onClick={() => (action === "Your Details" ? setAction("Add Student") : resetForm())}>
            {action === "Your Details" ? "add student" : "compare"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Form;
