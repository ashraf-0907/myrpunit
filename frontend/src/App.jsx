// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompareResult from './compareResult.jsx';
import Form from './form.jsx';
import './App.css'; // Import your CSS file for styling

function App() {
  return (
    <BrowserRouter>
      <div className="center-container">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/compareResult" element={<CompareResult />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


