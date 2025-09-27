import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StudentMaintenancePage from './components/StudentMaintenancePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<StudentMaintenancePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
