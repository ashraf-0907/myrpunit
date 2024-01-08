// import { useState, useEffect } from "react";
// import "./form.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Form() {
//   const [action, setAction] = useState("Your Details");
//   const [enroll1, setEnroll1] = useState("");
//   const [faculty1, setFaculty1] = useState("");
//   const [enroll2, setEnroll2] = useState("");
//   const [faculty2, setFaculty2] = useState("");
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (action === "Your Details") {
//       setAction("Add Students");
//     }
//   }, [action]); // Whenever 'action' changes, check if it's 'Your Details'

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setIsButtonDisabled(true);
//     setError(null);

//     try {
//       const response = await axios.post("http://localhost:8080/", {
//         fac1: faculty1,
//         en1: enroll1,
//         fac2: faculty2,
//         en2: enroll2,
//       });
//       console.log("Data sent successfully:", response.data);
//       setEnroll1("");
//       setFaculty1("");
//       setEnroll2("");
//       setFaculty2("");
//     } catch (error) {
//       console.error("Error sending data:", error);
//       setError("There was an issue submitting the form. Please try again.");
//     } finally {
//       setIsButtonDisabled(false);
//     }
//   };

//   const resetForm = () => {
//     setEnroll1("");
//     setFaculty1("");
//     setEnroll2("");
//     setFaculty2("");
//     setAction("Your Details");
//     navigate("/compareResult");
//   };

//   return (
//     <div className="container">
//       <div className="header">
//         <div className="text">{action}</div>
//         <div className="underline"></div>
//         <form onSubmit={handleSubmit}>
//           <div className="chor">
//             <div className="inputs">
//               <div className="input">
//                 <input
//                   className="input"
//                   type="text"
//                   placeholder="Faculty Number"
//                   value={faculty1}
//                   name="fac"
//                   onChange={(e) => setFaculty1(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="input">
//                 <input
//                   className="input"
//                   type="text"
//                   placeholder="Enrollment Number"
//                   value={enroll1}
//                   name="en"
//                   onChange={(e) => setEnroll1(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="inputs">
//               <div className="input">
//                 <input
//                   className="input"
//                   type="text"
//                   placeholder="Faculty Number"
//                   value={faculty2}
//                   name="fac"
//                   onChange={(e) => setFaculty2(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="input">
//                 <input
//                   className="input"
//                   type="text"
//                   placeholder="Enrollment Number"
//                   value={enroll2}
//                   name="en"
//                   onChange={(e) => setEnroll2(e.target.value)}
//                   required
//                 />
//               </div>
//               {error && <div className="error">{error}</div>}
//             </div>
//           </div>
//           <div className="submit-container">
//             <button
//               className="submit"
//               type="submit"
//               disabled={isButtonDisabled}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//         <div className="text-add">
//           Click to{" "}
//           <span
//             onClick={() =>
//               action === "Your Details" ? setAction("Add Student") : resetForm()
//             }
//           >
//             {action === "Your Details" ? "add student" : "compare"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Form;



import { useState, useEffect } from "react";
import "./form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form() {
  const [action, setAction] = useState("Your Details");
  const [enroll1, setEnroll1] = useState("");
  const [faculty1, setFaculty1] = useState("");
  const [enroll2, setEnroll2] = useState("");
  const [faculty2, setFaculty2] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (action === "Your Details") {
      setAction("Add Students");
    }
  }, [action]); // Whenever 'action' changes, check if it's 'Your Details'

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/", {
        fac1: faculty1.toUpperCase(),
        en1: enroll1.toUpperCase(),
        fac2: faculty2.toUpperCase(),
        en2: enroll2.toUpperCase(),
      });
      console.log("Data sent successfully:", response.data);
      setEnroll1("");
      setFaculty1("");
      setEnroll2("");
      setFaculty2("");
    } catch (error) {
      console.error("Error sending data:", error);
      setError("There was an issue submitting the form. Please try again.");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const resetForm = () => {
    setEnroll1("");
    setFaculty1("");
    setEnroll2("");
    setFaculty2("");
    setAction("Your Details");
    navigate("/compareResult");
  };

  const handleFaculty1Change = (e) => {
    setFaculty1(e.target.value.toUpperCase());
  };

  const handleEnroll1Change = (e) => {
    setEnroll1(e.target.value.toUpperCase());
  };

  const handleFaculty2Change = (e) => {
    setFaculty2(e.target.value.toUpperCase());
  };

  const handleEnroll2Change = (e) => {
    setEnroll2(e.target.value.toUpperCase());
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="chor">
          <div className="inputs">
            <div className="input">
              <input
                className="input"
                type="text"
                placeholder="Faculty Number"
                value={faculty1}
                name="fac"
                onChange={handleFaculty1Change}
                required
              />
            </div>
            <div className="input">
              <input
                className="input"
                type="text"
                placeholder="Enrollment Number"
                value={enroll1}
                name="en"
                onChange={handleEnroll1Change}
                required
              />
            </div>
          </div>
          <div className="inputs">
            <div className="input">
              <input
                className="input"
                type="text"
                placeholder="Faculty Number"
                value={faculty2}
                name="fac"
                onChange={handleFaculty2Change}
                required
              />
            </div>
            <div className="input">
              <input
                className="input"
                type="text"
                placeholder="Enrollment Number"
                value={enroll2}
                name="en"
                onChange={handleEnroll2Change}
                required
              />
            </div>
            {error && <div className="error">{error}</div>}
          </div>
        </div>
        <div className="submit-container">
          <button className="submit" type="submit" disabled={isButtonDisabled}>
            Submit
          </button>
        </div>
      </form>
      <div className="text-add">
          Click to{" "}
          <span
            onClick={() =>
              action === "Your Details" ? setAction("Add Student") : resetForm()
            }
          >
            {action === "Your Details" ? "add student" : "compare"}
          </span>
        </div>
    </div>
  );
}

export default Form;