import { useState } from "react";
import "./form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form() {
  const [action, setAction] = useState("Your Details");
  const [enroll, setEnroll] = useState("");
  const [faculty, setFaculty] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to track button disable
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsButtonDisabled(true); // Disable the button on click
    try {
      const response = await axios.post("http://localhost:8080/", {
        fac: faculty,
        en: enroll,
      });
      console.log("Data sent successfully:", response.data);
      // Reset form fields after successful submission
      setEnroll("");
      setFaculty("");
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setIsButtonDisabled(false); // Enable the button after operation completes
    }
  };

  const resetForm = () => {
    setEnroll("");
    setFaculty("");
    setAction("Your Details");
     navigate("/compareResult")
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
                onChange={(e) => setFaculty(e.target.value)}
              />
            </div>
            <div className="input">
              <input
                className="input"
                type="text"
                placeholder="Enrollment Number"
                value={enroll}
                onChange={(e) => setEnroll(e.target.value)}
              />
            </div>
            <div className="submit-container">
              <button className="submit" type="submit" disabled={isButtonDisabled}>
                {/* {action === "Your Details"? "Submit":"Compare"} */}
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="text-add">
          click to{" "}
          <span onClick={() => (action === "Your Details" ? setAction("Add Student") : resetForm())}>
            {action === "Your Details" ? "add student" : "compare"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Form;
