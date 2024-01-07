// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompareResult from './components/compareResult.jsx';
import Form from './components/form.jsx';
import './App.css'; // Import CSS file for styling

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


